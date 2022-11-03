import initSqlJs from '@urdeveloper/sql.js';
import { SQLiteFS } from 'absurd-sql';
import IndexedDBBackend from 'absurd-sql/dist/indexeddb-backend.js';
import { GENERIC_QUERY, GENERIC_QUERY_RESPONSE, NEW_DB_FROM_FILE, REFRESH_DB_STATE, TABLELAND_IMPORT } from '../../consts.js';

function getDatabaseTableList(database) {
  console.log("Database", database);
  const { db } = database;
  let databaseTableList = db.exec(`
    SELECT name FROM sqlite_schema
    WHERE type='table'
    ORDER BY name;
  `);

  // WHY? Because when SQLite has no resulting rows
  // the resulting object also fails to return the _columns_ 
  // object, meaning we won't know the column names unless
  // we know them a-priori.
  function findColumns(table) {
    return db.exec(`
      CREATE TEMP TABLE IF NOT EXISTS ${table}_empty_fix (empty); insert into ${table}_empty_fix (empty) values ('');
      SELECT m.rowid as rowid, m.* FROM ${table}_empty_fix LEFT JOIN ${table} m;
    `)[0].columns;
  }

  let d1fulltbls = databaseTableList[0]?.values.map(table => {
    const tblRawResults = db.exec(`SELECT rowid as rowid, * FROM ${table[0]};`);

    return {
      name: table[0],
      columns: tblRawResults[0]?.columns || findColumns(table[0]),
      rows: tblRawResults[0]?.values || []
    }
  }) || [];


  return  {
    name: database.name,
    tables: d1fulltbls
  };
}




async function run() {
  let SQL = await initSqlJs({ locateFile: file => file });
  let sqlFS = new SQLiteFS(SQL.FS, new IndexedDBBackend());
  SQL.register_for_idb(sqlFS);

  SQL.FS.mkdir('/sql');
  SQL.FS.mount(sqlFS, {}, '/sql');

  const path = '/sql/meta_db.sqlite';
  let db = new SQL.Database(path, { filename: true });
  const tblPath = '/sql/tableland';
  let tablelanddb = new SQL.Database(tblPath, {filename: true});
  db.exec(`
    PRAGMA journal_mode=MEMORY;
    PRAGMA page_size=8192;
  `);
  tablelanddb.exec(`
    PRAGMA journal_mode=MEMORY;
    PRAGMA page_size=8192;
  `)
  db.exec(`
    CREATE TABLE IF NOT EXISTS StoredTables (id integer primary key, name text unique);
    INSERT INTO StoredTables (name) values ('tableland') ON CONFLICT DO NOTHING;
  `);

  let otherTables = db.exec("SELECT * FROM StoredTables;");
  console.log(otherTables);

  let dbList = [];
  if (otherTables[0]?.values.length > 0) {
    dbList = otherTables[0].values.map(table => {
      let innerDb = new SQL.Database(`/sql/${table[1]}`, { filename: true });
      innerDb.exec(`
        PRAGMA journal_mode=MEMORY;
        PRAGMA page_size=8192;
      `);


      return {
        name: table[1],
        db: innerDb
      }
    });
  }




  self.addEventListener('message', (e) => {
    switch (e.data.type) {
      case NEW_DB_FROM_FILE:
        new SQL.Database(new Uint8Array(e.data.blobby), { filename: `/sql/${e.data.name}` });      
        db.exec(`INSERT INTO StoredTables (name) values ('${e.data.name}');`);
        break;

      
      case GENERIC_QUERY: 
        const innerdb = dbList.find((db) => db.name === e.data.db);
        let result;
        try {
          result = innerdb.db.exec(e.data.query)[0];

          let formattedResult = {
            query: e.data.query,
            columns: result?.columns ?? [],
            rows: result?.values ?? []
          }
          let tableList2 = dbList.map(getDatabaseTableList);

          self.postMessage({
            type: REFRESH_DB_STATE,
            dbs: tableList2,
          });  

          self.postMessage({
            type: GENERIC_QUERY_RESPONSE,
            responseId: e.data.id,
            result: formattedResult
          }); 
        } catch (error) {
          self.postMessage({
            type: GENERIC_QUERY_RESPONSE,
            responseId: e.data.id,
            result: {
              error: error.message,
              query: e.data.query
            }
          });
        }

        break;

    }

  });
  

  const tableList = dbList.map(getDatabaseTableList);

  
  self.postMessage({
    type: REFRESH_DB_STATE,
    dbs: tableList,
  });   
}

run();

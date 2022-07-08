import React from 'react';
import { Link } from 'react-router-dom';
import { GENERIC_QUERY } from '../../../consts';

async function populateFromTableland() {
  const tableList = Object.values(await tbl.list());
  let myTables = await Promise.all(tableList.map(async table => {
    return {
      name: table.name,
      contents: await tbl.read(`SELECT * FROM ${table.name};`)
    };
  }));
  console.log(myTables);
  const sqlheader = myTables.map(table => {
    const columns = table.contents.columns.map(column => {
      return column.name;
    }).join(', ');
    return `DROP TABLE IF EXISTS ${table.name}; CREATE TABLE ${table.name} (${columns});`;
  }).join("; \n");
  const sqlbody = myTables.map(table => {
    const rows = table.contents.rows.map(rows => {
      return `('${rows.join("','")}')`;
    });
    if(rows.length === 0) return "";
    const columns = table.contents.columns.map(column => {
      return column.name;
    }).join(', ');
    return `INSERT INTO ${table.name} (${columns}) VALUES ${rows.join(",")}`
  }).join("; \n");
  console.log(sqlheader + sqlbody);
  return sqlheader + sqlbody;
}

function Header(props) {

  return (
    <header className='navbar'>
    <img src="/assets/tableland.svg" className='navbar--logo' />
    <ul className='navbar--menu'>
      <li><Link to="/about">About</Link></li>
      <li>
      <button className='subtle'>Upload Database (sqlite)</button>
      </li>
      <li>
        <button onClick={async e => {
          // TODO: This is trash
          worker.postMessage({
            db: "tableland",
            query: await populateFromTableland(),
            type: GENERIC_QUERY
          })
        }} >Connect to Tableland</button>
      </li>
    </ul>
  </header>
  );
}
export default Header;

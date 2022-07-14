export default // TODO! : Clean up, move, and docucomment this function
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

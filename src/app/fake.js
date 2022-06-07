// This is all fake data
// TODO: Make better fake data, preferable from a true DB
const storeDefaultDatabases = [
  {
    name: "DB1",
    tables: [
      {
        name: "Table1",
        columns: ["first", "Second"],
        rows: [
          ["Allen", "Muncy"]
        ]
      },
      {
        name: "Table2",
        columns: ["first", "Second", "Third"],
        rows: [
          ["Sound", "Engineering", "Bob woodershine"]
        ]
      }
    ]
  }, 
  {
    name: "Second Database",
    tables: [
      {
        name: "More cool table name",
        columns: ["I", "Have", "Lots", "of", "Columns"],
        rows: [
          ["", null, null, "", "HELLO"],
          ["And at least", "a few", "different", "row", "."]
        ]
      }
    ] 
  }
];

const storeDefaultSelectedCell = {
  database: 0,
  table: 0,
  row: 0,
  column: 0
};

export {
  storeDefaultDatabases,
  storeDefaultSelectedCell
};

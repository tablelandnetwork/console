export async function getQueryType(query) {
  try {
    await sqlparser.parse(query);
  } catch (e) {
    return 'invalid';
  }

  try {
    let fakeInsert = "INSERT INTO t (id) VALUES (0);"
    await Promise.any([
      sqlparser.parse(`${query};${fakeInsert}`),
      sqlparser.parse(`${query} ${fakeInsert}`)
    ]);
    return 'write';

  } catch(e) {
    return 'read';
  }
}

export async function query(query, options) {
  await sqlparser.parse(query);

  let isWrite; 
  
  try {
    await sqlparser.parse(query + "INSERT INTO SOMETHING (id) VALUES ('se');");
    isWrite = true;


  } catch(e) {
    isWrite = false;
  }

  if(isWrite) {
    queryLocal(query, options);
  } else {
    queryGateway(query, options);
  }
}

export async function queryGateway(query, options) {
  const resultSet = await getTablelandConnection.read(query);
  return resultSet;
}

export async function getQueryType(query) {
  try {
    await sqlparser.parse(query);
  } catch (e) {
    return 'invalid';
  }

  try {
    await sqlparser.parse(query + "INSERT INTO SOMETHING (id) VALUES ('se');");
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
  const resultSet = await tbl.read(query);
  return resultSet;
}

// export async function queryLocal(query, options={}) {
  
//   const id = Math.random();
//   worker.addEventListener('message', e => {
//     if(e.data.responseId!==id) return; 
//     let result = e.data.result;
//     result.editable = options.editable;
//     store.dispatch(resultSetUpdated(result));
//   });

//   store.dispatch(queryAppended(query))

  
//   const message = {
//     id,
//     type: GENERIC_QUERY,
//     query: query,
//     db: options.db ?? "tableland"
//   };
//   worker.postMessage(message);
// }

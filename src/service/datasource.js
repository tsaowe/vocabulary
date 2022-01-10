import React, {useEffect} from "react";

const db = openDatabase('vocabulary', '1.0', 'vocabulary', 1024 * 1024 * 10);
const tableName = 'RightClickAction';

export const updateDescription = (uid, description)=>{
  db.transaction(tx => {
    tx.executeSql(`update ${tableName} set description = ? where uid = ?`, [description, uid]);
  });
}

export const useDatasource = ()=>{
  const [dataSource, setDataSource] = React.useState([{
    word: 'demo',
    createTime: new Date().getTime(),
    uid: 'xxx',
    description: 'inter & twined'
  }]);
  useEffect(()=>{
    db.transaction(function (tx) {
      tx.executeSql(`SELECT * FROM ${tableName} order by createTime DESC`, [], function (tx, results) {
        const list = results.rows;
        setDataSource(list);
      }, null);
    });
  },[setDataSource])

  return dataSource;
}

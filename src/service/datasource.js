import React, {useEffect} from "react";

const db = openDatabase('vocabulary', '1.0', 'vocabulary', 1024 * 1024 * 10);
const tableName = 'RightClickAction';

export const useDatasource = ()=>{
  const [dataSource, setDataSource] = React.useState([]);
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

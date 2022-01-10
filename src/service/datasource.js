import React, { useEffect } from "react";
import * as R from "ramda";

const db = openDatabase("vocabulary", "1.0", "vocabulary", 1024 * 1024 * 10);
const tableName = "RightClickAction";

export const updateDescription = (uid, description) => {
  db.transaction(tx => {
    tx.executeSql(`update ${tableName} set description = ? where uid = ?`, [
      description,
      uid
    ]);
  });
};

export const updateWord = (uid, word) => {
  db.transaction(tx => {
    tx.executeSql(`update ${tableName} set word = ? where uid = ?`, [
      word,
      uid
    ]);
  });
};

export const deleteWord = uid => {
  db.transaction(tx => {
    tx.executeSql(`delete from ${tableName} where uid = ?`, [uid]);
  });
};

/**
 * 0 => 不认识
 * 1 => 认识
 * -1 => 已删除
 * @param uid
 */
export const updateFamiliarToKnow = uid => {
  db.transaction(tx => {
    tx.executeSql(
      `update ${tableName}
                   set status = ?
                   where uid = ?`,
      [1, uid]
    );
  });
};

export const updateFamiliarToUnKnow = uid => {
  db.transaction(tx => {
    tx.executeSql(
      `update ${tableName}
                   set status = ?
                   where uid = ?`,
      [0, uid]
    );
  });
};

export const updateFamiliarToDelete = uid => {
  db.transaction(tx => {
    tx.executeSql(
      `update ${tableName}
                   set status = ?
                   where uid = ?`,
      [-1, uid]
    );
  });
};

export const updateStatus = (uid, status) => {
  db.transaction(tx => {
    tx.executeSql(
      `update ${tableName}
                   set status = ?
                   where uid = ?`,
      [status, uid]
    );
  });
};

export const useDatasource = () => {
  // const [dataSource, setDataSource] = React.useState(R.repeat({
  //   word: 'demo',
  //   createTime: new Date().getTime(),
  //   uid: 'xxx',
  //   description: 'inter & twined'
  // }, 100));
  const [dataSource, setDataSource] = React.useState([]);
  useEffect(() => {
    db.transaction(function(tx) {
      tx.executeSql(
        `SELECT * FROM ${tableName} order by createTime DESC`,
        [],
        function(tx, results) {
          const list = results.rows;
          setDataSource(list);
        },
        null
      );
    });
  }, [setDataSource]);

  return dataSource;
};

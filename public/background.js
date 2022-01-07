const tableName = 'RightClickAction';

const db = openDatabase('vocabulary', '1.0', 'vocabulary', 1024 * 1024 * 10);

db.transaction(tx => {
  tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (word, createTime)`)
})

chrome.contextMenus.create(
  {
    type: 'normal',
    title: '添加到书架',
    id: 'addToShelf',
    contexts: ['all'],
    onclick: async (info) => {
      db.transaction(tx => {
        tx.executeSql(`INSERT INTO ${tableName} (word, createTime) VALUES (?, ?)`,
          [info.selectionText, new Date().getTime()],
          () => {},
          (tx, err) => alert(err.message)
        )
      })
    },
  },
  function () {
    console.log('contextMenus are create.');
  },
);

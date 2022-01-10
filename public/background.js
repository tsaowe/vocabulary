const tableName = "RightClickAction";

const getUidString = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const db = openDatabase("vocabulary", "1.0", "vocabulary", 1024 * 1024 * 10);

db.transaction(tx => {
  tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName}
                 (
                     uid,
                     word,
                     createTime,
                     description,
                     status
                 )`);
});

chrome.contextMenus.create(
  {
    type: "normal",
    title: "添加到书架",
    id: "addToShelf",
    contexts: ["all"],
    onclick: async info => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO ${tableName} (uid, word, createTime, status)
                       VALUES (?, ?, ?, ?)`,
          [getUidString(16), info.selectionText, new Date().getTime(), 0],
          () => {},
          (tx, err) => alert(err.message)
        );
      });
    }
  },
  function() {
    console.log("contextMenus are create.");
  }
);

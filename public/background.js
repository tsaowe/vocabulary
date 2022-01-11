const db = new Dexie('vocabulary');

db.version(1).stores({
  words: '++id, word, createTime, description, status',
});

chrome.contextMenus.create(
  {
    type: "normal",
    title: "添加到书架",
    id: "addToShelf",
    contexts: ["all"],
    onclick: async info => {
      db.words.add({
        word: (info.selectionText || '').toLowerCase(),
        createTime: new Date().getTime(),
        description: '',
        status: 0,
      });
    }
  },
  function() {
    console.log("contextMenus are create.");
  }
);

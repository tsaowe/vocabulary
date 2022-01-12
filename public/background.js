const db = new Dexie("vocabulary");
db.version(1).stores({
  words: "++id, word, createTime, description, status"
});

chrome.contextMenus.create(
  {
    type: "normal",
    title: "add to my vocabulary",
    id: "addToShelf",
    contexts: ["all"],
    onclick: async info => {
      const word = (info.selectionText || "").toLowerCase();
      const existing =
        (await db.words
          .where("word")
          .equals(word)
          .count()) > 0;
      if (!existing) {
        db.words.add({
          word,
          createTime: new Date().getTime(),
          description: "",
          status: 0
        });
        // const context = document.querySelector("body");
        // const instance = new Mark(context);
        // instance.mark(word);
      }
    }
  },
  function() {
    console.log("contextMenus are create.");
  }
);

const db = new Dexie("vocabulary");

db.version(1).stores({
  words: "++id, word, createTime, description, status"
});
const context = document.querySelector("body");
const instance = new Mark(context);
db.words
  .reverse()
  .toArray()
  .then(list => {
    list.forEach(item => {
      instance.mark(item.word);
    });
  });

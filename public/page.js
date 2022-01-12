/* eslint-disable no-undef */
const db = new Dexie('vocabulary');

db.version(1).stores({
  words: '++id, word, createTime, description, status',
});
const context = document.querySelector("body");
const instance = new Mark(context);
db.words.reverse().toArray().then(list=>{
  console.log(`<${'='.repeat(30)} page.js:10 ${'='.repeat(30)}>`, list);
  list.forEach(item=>{
    instance.mark(item.word);
  })
});

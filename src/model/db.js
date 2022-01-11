import Dexie from 'dexie';

export const db = new Dexie('vocabulary');

db.version(1).stores({
  words: '++id, word, createTime, description, status',
});

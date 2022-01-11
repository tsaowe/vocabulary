import React, {useEffect} from "react";
import * as R from "ramda";

import {db} from '../model/db'

export const updateDescription = (id, description) => {
  db.words.update(id, {description})
};

export const updateWord = (id, word) => {
  db.words.update(id, {word})
};

export const deleteWord = id => {
  db.words.where("id").equals(id).delete();
};


export const updateStatus = (id, status) => {
  db.words.update(id, {status})
};

export const useDatasource = () => {
  const inChromeExtensionNewTab = window.location.href.indexOf("chrome-extension://") === 0;
  const [dataSource, setDataSource] = React.useState(inChromeExtensionNewTab ? [] : R.repeat({
    word: 'demo',
    createTime: new Date().getTime(),
    id: 'xxx',
    description: 'inter & twined'
  }, 100));
  useEffect(() => {
    db.words.reverse().toArray().then(setDataSource);
  }, [setDataSource]);

  return dataSource;
};

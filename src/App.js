import React, {useEffect, useState} from "react";
import {addWord, useDatasource} from "./service/datasource";
import { WordCardList } from "./components/word-card-list";
import * as R from 'ramda';
import "./app.css";

function App() {

  const list = useDatasource();

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    //  cmd + J
    const keydown = (e) => {
      if (e.keyCode === 74 && e.metaKey) {
        //  add new word
        const word = prompt("Add New word");
        if (word) {
          addWord(word).then(wordInfo => {
            console.log(`<${'='.repeat(30)} App.js:21 ${'='.repeat(30)}>`, wordInfo);
            setDataSource(R.concat([wordInfo], list));
          });
        }
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
    }
  }, [list]);

  useEffect(()=>{
    setDataSource(list);
  },[list, setDataSource]);

  return (
    <div className="container-wrap">
      <WordCardList dataSource={dataSource} />
    </div>
  );
}

export default App;

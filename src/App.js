import React, {useCallback, useEffect, useState} from "react";
import {addWord, useDatasource} from "./service/datasource";
import { WordCardList } from "./components/word-card-list";
import "./app.css";

function App() {

  const list = useDatasource();

  const [dataSource, setDataSource] = useState([]);

  const keydown = useCallback((e) => {
    //  cmd + J
    if (e.keyCode === 74 && e.metaKey) {
      //  add new word
      const word = prompt("Add New word");
      if (word) {
        addWord(word).then(()=>{
          window.location.reload();
        });
      }
    }
  },[list, setDataSource]);

  useEffect(() => {
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [keydown]);

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

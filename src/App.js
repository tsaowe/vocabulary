import React from "react";
import { useDatasource } from "./service/datasource";
import { WordCardList } from "./components/word-card-list";
import "./app.css";


function App() {
  const dataSource = useDatasource();

  return (
    <div className="container-wrap">
      <WordCardList dataSource={dataSource} />
    </div>
  );
}

export default App;

import React from "react";
import { useDatasource } from "./service/datasource";
import { WordCardList } from "./components/word-card-list";
import "./app.css";

/******************************************************************************/
// style

const grid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  xxl: 8
};

/******************************************************************************/

function App() {
  const dataSource = useDatasource();

  return (
    <div className="container-wrap">
      <WordCardList grid={grid} dataSource={dataSource} />
    </div>
  );
}

export default App;

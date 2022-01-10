import React from "react";
import { useDatasource } from "./service/datasource";
import { WordCardList } from "./components/word-card-list";
import "./app.css";

/******************************************************************************/
// style

const grid = {
  //  distance between two card
  gutter: 16,
  // < 576px
  xs: 1,
  // < 768px
  sm: 1,
  // < 992px
  md: 2,
  // < 1200px
  lg: 3,
  // < 1600px
  xl: 4,
  // >= 1600px
  xxl: 5
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

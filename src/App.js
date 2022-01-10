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
  sm: 2,
  // < 992px
  md: 4,
  // < 1200px
  lg: 4,
  // < 1600px
  xl: 5,
  // >= 1600px
  xxl: 6
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

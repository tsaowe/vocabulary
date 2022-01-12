import React, { useState, useEffect } from "react";
import { List } from "antd";
import { WordCardItem } from "./word-card-item";

const grid = {
  //  distance between two card
  gutter: 16,
  // < 576px
  xs: 2,
  // < 768px
  sm: 3,
  // < 992px
  md: 3,
  // < 1200px
  lg: 4,
  // < 1600px
  xl: 5,
  // >= 1600px
  xxl: 7
};

export const WordCardList = props => {
  const [dataSource, setDataSource] = useState(props.dataSource);

  useEffect(() => {
    setDataSource(props.dataSource);
  }, [props.dataSource, setDataSource]);

  return (
    <List
      grid={grid}
      dataSource={dataSource}
      renderItem={(item, index) => (
        <List.Item>
          <WordCardItem
            index={index}
            dataSource={dataSource}
            setDataSource={setDataSource}
            item={item}
          />
        </List.Item>
      )}
    />
  );
};

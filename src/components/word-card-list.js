import React, {useState, useEffect} from "react";
import { List } from "antd";
import { WordCardItem } from "./word-card-item";

export const WordCardList = props => {
  const { grid } = props;

  const [dataSource, setDataSource] = React.useState(props.dataSource);

  useEffect(()=>{
    setDataSource(props.dataSource);
  },[props.dataSource, setDataSource])


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

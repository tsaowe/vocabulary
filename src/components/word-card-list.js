import {List} from "antd";
import React from "react";
import {WordCardItem} from "./word-card-item";



export const WordCardList = (props)=>{
  const {grid, dataSource} = props;
  return <List
    grid={grid}
    dataSource={dataSource}
    renderItem={item => (
      <List.Item>
        <WordCardItem item={item}/>
      </List.Item>
    )}
  />
}

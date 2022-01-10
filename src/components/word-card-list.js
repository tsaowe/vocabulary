import {Card, List} from "antd";
import moment from "moment";
import React from "react";

export const WordCardList = (props)=>{
  const {grid, dataSource} = props;
  return <List
    grid={grid}
    dataSource={dataSource}
    renderItem={item => (
      <List.Item>
        <Card title={item.word}>
          <div onClick={()=>{
            console.log(JSON.stringify(item));
          }}>{item.word}</div>
          <div>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
        </Card>
      </List.Item>
    )}
  />
}

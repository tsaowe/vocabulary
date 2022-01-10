import { List } from "antd";
import React from "react";
import { WordCardItem } from "./word-card-item";

export const WordCardList = props => {
  const { grid } = props;
  const [dataSource, setDataSource] = React.useState(props.dataSource);
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

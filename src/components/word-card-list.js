import {Card, List, Typography, message} from "antd";
import moment from "moment";
import React from "react";
import {updateDescription} from "../service/datasource";

const { Paragraph, Text } = Typography;


export const WordCardList = (props)=>{
  const {grid, dataSource} = props;
  return <List
    grid={grid}
    dataSource={dataSource}
    renderItem={item => (
      <List.Item>
        <Card title={item.word}>
          <Text type="secondary">{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
          <Paragraph editable={{
            onChange: async (value) => {
              updateDescription(item.uid, value);
              await message.success('修改成功');
            }
          }}>{item.description}</Paragraph>
        </Card>
      </List.Item>
    )}
  />
}

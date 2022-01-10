import moment from "moment";
import {updateDescription} from "../service/datasource";
import {Card, message, Typography} from "antd";
import React from "react";

const { Paragraph, Text } = Typography;

export const WordCardItem = ({item})=>{

  const [description, setDescription] = React.useState(item.description);

  return <Card title={item.word}>
    <Text type="secondary">{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
    <Paragraph editable={{
      onChange: async (value) => {
        if(value?.trim?.() === description){
          return;
        }
        updateDescription(item.uid, value);
        setDescription(value);
        await message.success('修改成功');
      }
    }}>{description}</Paragraph>
  </Card>
}

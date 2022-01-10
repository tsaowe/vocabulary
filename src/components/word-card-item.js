import moment from "moment";
import {updateDescription, updateStatus} from "../service/datasource";
import {Card, message, Typography, Tag} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import React from "react";


const { Paragraph, Text } = Typography;

const style = {cursor: 'pointer'};

export const WordCardItem = ({item})=>{

  const [description, setDescription] = React.useState(item.description);
  const [status, setStatus] = React.useState(item.status);
  let cardStyle = {};
  switch (status) {
    case -1:
      cardStyle = { opacity: 0.5 };
      break;
    case 0:
      cardStyle = { background: '#FFFBE4' };
      break;
    case 1:
      cardStyle = { background: '#F4FFEB' };
      break;
    default:
      cardStyle = { background: 'purple' };
  }


  const clickFunc = (uid, status) => {
    updateStatus(uid, status);
    setStatus(status);
  }

  return <Card
    extra={[
      <Tag style={style} onClick={() => {
        clickFunc(item.uid, 1);
      }} color="success"><CheckCircleOutlined/></Tag>,
      <Tag onClick={() => {
        clickFunc(item.uid, 0);
      }} style={style} color="warning"><ExclamationCircleOutlined/></Tag>,
      <Tag onClick={() => {
        clickFunc(item.uid, -1);
      }} style={style} color="error"><CloseCircleOutlined/></Tag>,
    ]} size="small" title={item.word} style={{ maxWidth: 250, ...cardStyle }}>
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

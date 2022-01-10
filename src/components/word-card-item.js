import React from "react";
import moment from "moment";
import * as R from "ramda";
import {
  deleteWord,
  updateDescription,
  updateStatus,
  updateWord
} from "../service/datasource";
import {
  Card,
  message,
  Typography,
  Tag,
  Popconfirm,
  Input,
  Badge,
  Modal
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";

const { Paragraph, Text } = Typography;

const extraIconStyle = { cursor: "pointer" };

export const WordCardItem = ({ item}) => {

  const [deleted, setDeleted] = React.useState(false);

  const [description, setDescription] = React.useState(
    item.description || "--"
  );
  const [status, setStatus] = React.useState(item.status);
  let cardStyle;
  switch (status) {
    case -1:
      cardStyle = { opacity: 0.5 };
      break;
    case 0:
      cardStyle = { background: "#FFFBE4" };
      break;
    case 1:
      cardStyle = { background: "#F4FFEB" };
      break;
    default:
      cardStyle = { background: "purple" };
  }

  const [word, setWord] = React.useState(item.word);

  const clickFunc = (uid, status) => {
    updateStatus(uid, status);
    setStatus(status);
  };

  if(deleted){
    return null;
  }

  return (
    <div key={item.uid}>
      <Badge
        dot
        onClick={() => {
          Modal.confirm({
            title: `are you sure delete this word '${item.word}'?`,
            icon: null,
            content: null,
            okText: "Yes",
            cancelText: "No",
            async onOk() {
              deleteWord(item.uid);
              setDeleted(true);
              message.success("删除成功");
            }
          });
        }}
        color="red"
      >
        <Card
          extra={[
            <Tag
              style={extraIconStyle}
              onClick={() => {
                clickFunc(item.uid, 1);
              }}
              color="success"
            >
              <CheckCircleOutlined style={{ fontSize: 12 }}/>
            </Tag>,
            <Tag
              onClick={() => {
                clickFunc(item.uid, 0);
              }}
              style={extraIconStyle}
              color="warning"
            >
              <ExclamationCircleOutlined style={{ fontSize: 12 }}/>
            </Tag>,
            <Tag
              onClick={() => {
                clickFunc(item.uid, -1);
              }}
              style={extraIconStyle}
              color="error"
            >
              <CloseCircleOutlined style={{ fontSize: 12 }}/>
            </Tag>
          ]}
          size="small"
          title={
            <span style={{ fontSize: 12 }}>
            <Popconfirm
              icon={null}
              title={
                <Input
                  defaultValue={item.word}
                  onChange={e => {
                    setWord(e.target.value?.trim?.());
                  }}
                />
              }
              onConfirm={() => {
                if (word) {
                  updateWord(item.uid, word);
                  setWord(word);
                }
              }}
              okText="Yes"
              cancelText="No"
            >
              {word}
            </Popconfirm>
          </span>
          }
          style={{ maxWidth: 250, ...cardStyle }}
        >
          <Text type="secondary">
            {moment(R.pathOr("", ["createTime"])(item)).format(
              "YYYY-MM-DD HH:mm:ss"
            )}
          </Text>
          <Paragraph
            editable={{
              onChange: async value => {
                if (value?.trim?.() === description) {
                  return;
                }
                updateDescription(item.uid, value);
                setDescription(value);
                await message.success("修改成功");
              }
            }}
          >
            {description}
          </Paragraph>
        </Card>
      </Badge>
    </div>
  );
};

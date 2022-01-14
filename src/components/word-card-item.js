import React from "react";
import {
  deleteWord,
  updateDescription,
  updateStatus,
  updateWord
} from "../service/datasource";
import { Card, Typography, Tag, Badge, Modal } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  HighlightOutlined
} from "@ant-design/icons";
import "./word-card-item.css";

const { Paragraph } = Typography;

const extraIconStyle = { cursor: "pointer" };

export const WordCardItem = ({ item: outerItem }) => {
  const [item, setItem] = React.useState(outerItem);

  const [deleted, setDeleted] = React.useState(false);

  const [description, setDescription] = React.useState(item.description || "");
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

  const clickFunc = (id, status) => {
    updateStatus(id, status);
    setStatus(status);
  };

  if (deleted) {
    return null;
  }

  return (
    <div key={item.id}>
      <Badge
        dot
        style={extraIconStyle}
        onClick={() => {
          Modal.confirm({
            title: `Are you sure delete this word '${item.word}'?`,
            icon: null,
            content: null,
            okText: "Yes",
            cancelText: "No",
            async onOk() {
              deleteWord(item.id);
              setDeleted(true);
            }
          });
        }}
        color="red"
      >
        <div onClick={e => e.stopPropagation()}>
          <Card
            extra={[
              <Tag
                key={1}
                style={extraIconStyle}
                onClick={() => {
                  clickFunc(item.id, 1);
                }}
                color="success"
              >
                <CheckCircleOutlined style={{ fontSize: 12 }} />
              </Tag>,
              <Tag
                key={2}
                onClick={() => {
                  clickFunc(item.id, 0);
                }}
                style={extraIconStyle}
                color="warning"
              >
                <ExclamationCircleOutlined style={{ fontSize: 12 }} />
              </Tag>,
              <Tag
                key={3}
                onClick={() => {
                  clickFunc(item.id, -1);
                }}
                style={extraIconStyle}
                color="error"
              >
                <CloseCircleOutlined style={{ fontSize: 12 }} />
              </Tag>
            ]}
            size="small"
            title={
              <Paragraph
                editable={{
                  icon: <HighlightOutlined />,
                  tooltip: "click to edit word",
                  onChange(text) {
                    if (text) {
                      updateWord(item.id, text);
                      setItem({ ...item, word: text });
                    }
                  }
                }}
              >
                {item.word}
              </Paragraph>
            }
            style={{ width: 250, height: 90, ...cardStyle }}
          >
            <Paragraph
              style={{ fontSize: 12 }}
              editable={{
                onChange: async value => {
                  if (value?.trim?.() === description) {
                    return;
                  }
                  updateDescription(item.id, value);
                  setDescription(value);
                }
              }}
            >
              {description}
            </Paragraph>
          </Card>
        </div>
      </Badge>
    </div>
  );
};

import {Card, Flex, message, UploadFile, UploadProps} from 'antd';
import React, {useState} from 'react';
import {InboxOutlined} from "@ant-design/icons";
import {uploadFileUsingPost} from "@/services/backend/fileController";
import Dragger from "antd/es/upload/Dragger";

/**
 * 上传页面
 * @constructor
 */

interface Props {
  biz: string;
  description?: string;
  onChange?: (fileList: UploadFile[]) => void;
  value?: UploadFile[];

}
const UploadFiles: React.FC<Props> = (props) => {
  const {biz, value, description, onChange} = props;
  const [loading, setLoading] = useState<boolean>(false);
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    listType: "text",
    maxCount: 1,
    fileList: value,
    //如果正在上传就禁用
    disabled: loading,
    onChange({fileList}){
      onChange?.(fileList);
    },
    customRequest: async (fileObj: any) => {
      setLoading(true);
      try {
        const res = await uploadFileUsingPost(
          {biz}, {}, fileObj.file);
        fileObj.onSuccess(res.data);
      } catch (e: any) {
        message.error("上传失败" + e.message);
        fileObj.onError(e);
      }
      setLoading(false);
    },
  };

  return (
    <Flex justify="center" gap={16}>
      <Card title="">
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">点击或拖拽上传文件</p>
          <p className="ant-upload-hint">
            {description}
          </p>
        </Dragger>
      </Card>
    </Flex>
  );
};

export default UploadFiles;

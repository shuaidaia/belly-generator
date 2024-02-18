import {message, Upload, UploadProps} from 'antd';
import React, {useState} from 'react';
import {uploadFileUsingPost} from "@/services/backend/fileController";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {COS_HOST} from "@/constants";

/**
 * 上传页面
 * @constructor
 */


interface Props {
  biz: string;
  value?: string;
  onChange?: (url: string) => void;

}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const UploadPicture: React.FC<Props> = (props) => {
  const {biz, value, onChange} = props;
  const [loading, setLoading] = useState<boolean>(false);
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    listType: "picture-card",
    maxCount: 1,
    showUploadList: false,
    //如果正在上传就禁用
    disabled: loading,
    customRequest: async (fileObj: any) => {
      setLoading(true);
      try {
        const res = await uploadFileUsingPost(
          {biz}, {}, fileObj.file);
        const fullPath: string = COS_HOST + res.data;
        onChange?.(fullPath??'');
        fileObj.onSuccess(res.data);
      } catch (e: any) {
        message.error("上传失败" + e.message);
        fileObj.onError(e);
      }
      setLoading(false);
    },
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </button>
  );

  return (
    <Upload {...uploadProps}>
      {value?<img src={value} alt="picture" style={{width: "100%"}} /> : uploadButton}
    </Upload>
  );
};

export default UploadPicture;

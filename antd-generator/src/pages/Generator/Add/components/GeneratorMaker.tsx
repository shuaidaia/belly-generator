import React, {useRef} from "react";
import {ProForm, ProFormInstance, ProFormItem} from "@ant-design/pro-components";
import UploadFiles from "@/components/UploadFile";
import {Collapse, message} from "antd";
import {makeGeneratorUsingPost} from "@/services/backend/generatorController";
import {saveAs} from "file-saver";

interface Props {
  meta: any;
}

const App: React.FC<Props> = (props) => {
  const {meta} = props;
  const formRef = useRef<ProFormInstance>();

  const doSubmit = async (values: API.GeneratorMakeRequest) => {
    if (!meta.name) {
      message.error("请填写名称");
      return;
    }
    // 文件列表转换为url
    const zipPath = values.zipFilePath;
    // @ts-ignore
    if (zipPath || zipPath.length < 1) {
      message.error("请上传文件压缩包");
      return;

    }
    // @ts-ignore
    values.zipFilePath = zipPath[0].response;


    try { // eslint-disable-next-line react-hooks/rules-of-hooks
      const blob = await makeGeneratorUsingPost({
          meta,
          zipFilePath: values.zipFilePath,
        },
        {
          responseType: 'blob',
        });
      // 使用file-saver下载文件

      saveAs(blob, meta.name + ".zip");
    } catch (e: any) {
      message.error("下载失败" + e.message);
    }

  }

  const formView = (
    <ProForm
      formRef={formRef}
      submitter={{
        searchConfig: {
          submitText: "制作",
        },
        resetButtonProps: {
          hidden: true,
        }
      }}
      onFinish={doSubmit}
    >
      <ProFormItem label="制作模板" name="zipFilePath">
        <UploadFiles biz="generator_make_template" description="请上传压缩包"/>
      </ProFormItem>
    </ProForm>
  )


  return <Collapse style={{marginBottom: 24}} items={[
    {
      key: 'maker',
      label: '生成器制作工具',
      children: formView,
    },
  ]}/>;
};

export default App;

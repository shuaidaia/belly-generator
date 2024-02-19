import {
  ProCard,
  ProFormItem,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import {message, UploadFile} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import UploadPicture from "@/components/UploadPicture";
import {addGeneratorUsingPost, editGeneratorUsingPost, getGeneratorVoByIdUsingGet} from "@/services/backend/generatorController";
import {history} from "@umijs/max";
import {useSearchParams} from "@@/exports";
import {COS_HOST} from "@/constants";
import UploadFiles from "@/components/UploadFile";
import ModelConfigForm from "@/pages/Generator/Add/components/ModelConfigForm";
import FileConfigForm from "@/pages/Generator/Add/components/FileConfigForm";
import GeneratorMaker from "@/pages/Generator/Add/components/GeneratorMaker";


/**
 * 生成器创建页面
 * @constructor
 */
const GeneratorAdd: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [oldData, setOldData] = useState<API.GeneratorEditRequest>();
  const formRef = useRef<ProFormInstance>();
  const [basicInfo, setBasicInfo] = useState<API.GeneratorEditRequest>();
  const [modelConfig, setModelConfig] = useState<API.ModelConfig>();
  const [fileConfig, setFileConfig] = useState<API.FileConfig>();

  /**
   * 加载数据函数
   */
  const loadData = async () => {
    if (!id) {
      return;
    }
    try {
      // @ts-ignore
      const res = await getGeneratorVoByIdUsingGet({id});
      // 处理文件路径
      if (res.data) {
        console.log("res", res.data);
        const {distPath} = res.data ?? {};
        if (distPath) {
          // @ts-ignore
          res.data.distPath = [
            {
              uid: id,
              name: 'bellyGenerator' + id,
              status: 'done',
              url: COS_HOST + distPath,
              response: distPath,
            } as UploadFile,
          ];
        }
        setOldData(res.data);
        // formRef.current?.setFieldsValue(res.data);
      }
    } catch (e: any) {
      message.error("加载数据失败" + e.message);
    }
  };

  useEffect(() => {
        if (!id){
          return;
        }
        loadData();
      }, [id])

  const doAdd = async (values: API.GeneratorAddRequest) => {
    //调用接口
    try {
      // console.log("values=" + values);
      const res = await addGeneratorUsingPost(values);
      if (res.data) {
        message.success("创建成功");
        history.push(`/generator/detail/${res.data}`);
      }
    } catch (e: any) {
      message.error("创建失败" + e.message);
    }
  }

  const doUpdate = async (values: API.GeneratorEditRequest) => {
    //调用接口
    try {
      // console.log("values=" + values);
      const res = await editGeneratorUsingPost(values);
      if (res.data) {
        message.success("更新成功");
        history.push(`/generator/detail/${id}`);
      }
    } catch (e: any) {
      message.error("更新失败" + e.message);
    }
  }

  const doSubmit = async (values: API.GeneratorAddRequest) => {
    if (!values.fileConfig) {
      values.fileConfig = {};
    }
    if (!values.modelConfig) {
      values.modelConfig = {};
    }
    // 文件列表转换为url
    if (values.distPath && values.distPath.length > 0) {
      // @ts-ignore
      values.distPath = values.distPath[0].response;
    }

    //调用接口
    if (id){
      // @ts-ignore
      await doUpdate({id, ...values});
    } else {
      await doAdd(values);
    }
  }

  return (
    <ProCard>
      {
        (!id || oldData) && (<StepsForm<API.GeneratorAddRequest | API.GeneratorEditRequest>
        formRef={formRef}
        formProps={{initialValues: oldData,}}
        onFinish={doSubmit}
      >
        <StepsForm.StepForm
          name="base"
          title="基本信息"
          onFinish={async (values) => {
            setBasicInfo(values);
            return true;
          }}
        >
          <ProFormText name="name" label="名称" placeholder="请输入名称"/>
          <ProFormTextArea name="description" label="描述" placeholder="请输入描述"/>
          <ProFormText name="basePackage" label="基础包" placeholder="请输入基础包"/>
          <ProFormText name="version" label="版本" placeholder="请输入版本"/>
          <ProFormText name="author" label="作者" placeholder="请输入作者"/>
          <ProFormSelect label="标签" mode="tags" name="tags" placeholder="请输入标签列表"/>
          <ProFormItem label="图片" name="picture">
            <UploadPicture biz="generator_picture"/>
          </ProFormItem>
        </StepsForm.StepForm>

          <StepsForm.StepForm
            name="modelConfig"
            title="模型参数"
            onFinish={async (values) => {
              setModelConfig(values);
              return true;
            }}
          >
            <ModelConfigForm formRef={formRef} oldData={oldData}/>
          </StepsForm.StepForm>

        <StepsForm.StepForm
          name="fileConfig"
          title="文件参数"
          onFinish={async (values) => {
            setFileConfig(values);
            return true;
          }}
        >
          <FileConfigForm formRef={formRef} oldData={oldData}/>
        </StepsForm.StepForm>

        <StepsForm.StepForm
          name="dist"
          title="生成器文件"
        >
          <ProFormItem label="产物包" name="distPath">
            <UploadFiles biz="generator_dist" description="请上传模板文件压缩包"/>
          </ProFormItem>

          <GeneratorMaker meta={{
            ...basicInfo,
            ...fileConfig,
            ...modelConfig,
          }}/>
        </StepsForm.StepForm>
      </StepsForm>)
      }
    </ProCard>
  );
};
export default GeneratorAdd;

import {PageContainer,} from '@ant-design/pro-components';
import {Button, Card, Col, Collapse, Form, Image, Input, message, Row, Space, Tag, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {getGeneratorVoByIdUsingGet, useGeneratorUsingPost} from "@/services/backend/generatorController";
import {Link, useModel, useParams} from '@@/exports';
import {DownlandOutline} from "antd-mobile-icons";
import {saveAs} from "file-saver";
import {COS_HOST} from "@/constants";


/**
 * 生成器使用页面
 * @constructor
 */
const GeneratorUse: React.FC = () => {
  const [form] = Form.useForm();
  const {id} = useParams();
  const [data, setData] = useState<API.GeneratorVO>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [downLoading, setDownLoading] = useState<boolean>(false);
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};
  const models = data?.modelConfig?.models ?? [];
  /**
   * 加载数据函数
   */
  const loadData = async () => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      // @ts-ignore
      const res = await getGeneratorVoByIdUsingGet({id});

      setData(res.data ?? {});

    } catch (e: any) {
      message.error("加载数据失败" + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    loadData();
  }, [id])

  /**
   * 标签列表
   * @param tags
   */
  const tagListView = (tags?: string[]) => {
    if (!tags) {
      return <></>;
    }

    return (
      <div style={{marginBottom: 8}}>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    );
  };
  const downloadButton = data.distPath && currentUser && (
    <Button
      type="primary"
      loading={downLoading}
      icon={<DownlandOutline/>}
      onClick={async () => {
        setDownLoading(true);
        const fieldsValue = form.getFieldsValue();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const blob = await useGeneratorUsingPost({
            id: data.id,
            dataModel: fieldsValue
          },
          {
            responseType: 'blob',
          });
        // 使用file-saver下载文件
        const fullPath = COS_HOST + data.distPath;
        console.log("fullPath", fullPath);
        saveAs(blob, fullPath.substring(fullPath.lastIndexOf("/") + 1));
        setDownLoading(false);
      }}
    >下载</Button>
  )

  return (
    <PageContainer title={<></>} loading={loading}>
      <Card>
        <Row justify="space-between" gutter={[24, 24]}>
          <Col flex="auto">
            <Space>
              <Typography.Title level={4}>{data.name}</Typography.Title>
              {tagListView(data.tags)}
            </Space>
            <Typography.Paragraph>{data.description}</Typography.Paragraph>
            <div style={{marginBottom: 24}}/>
            <Form form={form}>
              {
                models.map((model, index) => {
                  if (model.groupKey) {
                    if (!model.models){
                      return <></>;
                    }
                    return (<Collapse style={{marginBottom: 24}} key={index} items={[
                      {
                        key: index,
                        label: model.groupName + "（组名）",
                        children: model.models?.map((sumModel, index) => {
                          return (
                            // @ts-ignore
                            <Form.Item key={index} label={sumModel.fieldName} name={[model.groupKey, sumModel.fieldName]}>
                              <Input placeholder={sumModel.description}/>
                            </Form.Item>
                          )
                        })
                      }
                    ]} bordered={false} defaultActiveKey={[index]}/>)
                  }

                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Form.Item label={model.fieldName} name={model.fieldName}>
                      <Input placeholder={model.description}/>
                    </Form.Item>
                  )
                })
              }
            </Form>
            <Space size="middle">
              <Link to={`/generator/detail/${id}`}>
                <Button>查看详情</Button>
              </Link>
              {downloadButton}
            </Space>
          </Col>
          <Col flex="480px">
            <Image src={data.picture}/>
          </Col>
        </Row>
      </Card>
      <div style={{marginBottom: 24}}/>
    </PageContainer>
  );
};
export default GeneratorUse;

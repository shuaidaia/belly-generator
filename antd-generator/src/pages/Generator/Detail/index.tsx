import {PageContainer,} from '@ant-design/pro-components';
import {Button, Card, Col, Image, message, Row, Space, Tabs, Tag, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
// @ts-ignore
import {downloadGeneratorByIdUsingGet, getGeneratorVoByIdUsingGet} from "@/services/backend/generatorController";
import {Link, useModel, useParams} from '@@/exports';
import moment from "moment";
import {DownlandOutline} from "antd-mobile-icons";
import FileConfig from "@/pages/Generator/Detail/components/FileConfig";
import ModelConfig from "@/pages/Generator/Detail/components/ModelConfig";
import AuthorInfo from "@/pages/Generator/Detail/components/AuthorInfo";
import {EditOutlined} from "@ant-design/icons";
import {saveAs} from "file-saver";
import {COS_HOST} from "@/constants";


/**
 * 生成器创建页面
 * @constructor
 */
const GeneratorDetail: React.FC = () => {
  const {id} = useParams();
  const [data, setData] = useState<API.GeneratorVO>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const my = data?.userId === currentUser?.id;

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
      icon={<DownlandOutline/>}
      onClick={async () => {
        const blob = await downloadGeneratorByIdUsingGet(
          {id: data.id},
          {
            responseType: 'blob',
          });
        // 使用file-saver下载文件
        const fullPath = COS_HOST + data.distPath;
        console.log("fullPath", fullPath);
        saveAs(blob, fullPath.substring(fullPath.lastIndexOf("/") + 1));
      }}
    >下载</Button>
  )

  const editButton = my && (
    <Link to={`/generator/update?id=${data.id}`}>
      <Button icon={<EditOutlined/>}>编辑</Button>
    </Link>

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
            <Typography.Paragraph type="secondary">
              创建时间{moment(data.createTime).format('YYYY-MM-DD hh:mm:ss')}
            </Typography.Paragraph>
            <Typography.Paragraph type="secondary">基础包：{data.basePackage}</Typography.Paragraph>
            <Typography.Paragraph type="secondary">版本：{data.version}</Typography.Paragraph>
            <Typography.Paragraph type="secondary">作者：{data.author}</Typography.Paragraph>
            <div style={{marginBottom: 24}}/>
            <Space size="middle">
              <Link to={`/generator/use/${id}`}>
                <Button type="primary">立即使用</Button>
              </Link>
              {downloadButton}
              {editButton}
            </Space>
          </Col>
          <Col flex="480px">
            <Image src={data.picture}/>
          </Col>
        </Row>
      </Card>
      <div style={{marginBottom: 24}}/>
      <Card>
        <Tabs
          size="large"
          defaultActiveKey={'fileConfig'}
          onChange={() => {
          }}
          items={[
            {
              key: 'userConfig',
              label: '作者信息',
              children: <AuthorInfo data={data}/>,
            },
            {
              key: 'fileConfig',
              label: '文件配置',
              children: <FileConfig data={data}/>,
            },
            {
              key: 'modelConfig',
              label: '模型配置',
              children: <ModelConfig data={data}/>,
            },
          ]}
        >

        </Tabs>
      </Card>
    </PageContainer>
  );
};
export default GeneratorDetail;

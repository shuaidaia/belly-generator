import React from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {Alert, Button, Card, Form, FormListFieldData, Input, Select, Space} from 'antd';

interface Props {
  formRef: any;
  oldData: any;
}

const App: React.FC<Props> = (props) => {
  const {formRef, oldData} = props;
  const singleFieldFormView = (
    field: FormListFieldData,
    remove?: (index: number | number[]) => void,
  ) => (
    <Space>
      <Form.Item label="输入路径" name={[field.name, 'inputPath']}>
        <Input/>
      </Form.Item>
      <Form.Item label="输出路径" name={[field.name, 'outputPath']}>
        <Input/>
      </Form.Item>
      <Form.Item label="类型" name={[field.name, 'type']}>
        <Select style={{minWidth: 80}} options={[
          {
            value: "file",
            label: "文件",
          },
          {
            value: "dir",
            label: "目录",
          }
        ]}/>
      </Form.Item>
      <Form.Item  label="生成类型" name={[field.name, 'generateType']}>
        <Select style={{minWidth: 80}} options={[
          {
            value: "static",
            label: "静态",
          },
          {
            value: "dynamic",
            label: "动态",
          }
        ]}/>
      </Form.Item>
      <Form.Item label="条件" name={[field.name, 'condition']}>
        <Input/>
      </Form.Item>
      {remove && (
        <Button type="text" danger onClick={() => remove(field.name)}>删除</Button>
      )}
    </Space>
  );

  return (
    <>
    <Alert message="如果不需要使用在线制作功能，可不填写该表单" type="warning" closable />
      <div style={{marginBottom: 24}}/>
    <Form.List name={["fileConfig", "files"]}>
      {(fields, {add, remove}) => (
        <div style={{display: 'flex', rowGap: 16, flexDirection: 'column'}}>
          {fields.map((field) => {
            const fileConfig = formRef?.current?.getFieldsValue()?.fileConfig??oldData?.fileConfig;
            const groupKey = fileConfig?.files?.[field.name]?.groupKey;
            return (
              <Card
                size="small"
                title={groupKey ? "分组" : "未分组字段"}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >

                {groupKey ? (<>
                  <Space>
                    <Form.Item label="分组key" name={[field.name, 'groupKey']}>
                      <Input/>
                    </Form.Item>
                    <Form.Item label="组名" name={[field.name, 'groupName']}>
                      <Input/>
                    </Form.Item>
                    <Form.Item label="条件" name={[field.name, 'condition']}>
                      <Input/>
                    </Form.Item>
                  </Space>
                </>) : ( singleFieldFormView(field) )}

                {/* Nest Form.List */}
                {groupKey && (
                  <Form.Item label="组字段">
                    <Form.List name={[field.name, 'files']}>
                      {(subFields, subOpt) => (
                        <div style={{display: 'flex', flexDirection: 'column', rowGap: 16}}>
                          {subFields.map((subField) => {
                            return singleFieldFormView(subField, subOpt.remove);
                          })}
                          <Button type="dashed" onClick={() => subOpt.add()}>
                            添加组字段
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                )}
              </Card>
            )
          })}

          <Button type="dashed" onClick={() => add()}>
            添加字段
          </Button>
          <Button type="dashed" onClick={() => add({
            groupName: "分组",
            groupKey: "groupKey",
            type: "group",
          })}>
            添加分组
          </Button>
          <div style={{marginBottom: 18}}/>
        </div>
      )}
    </Form.List>
    </>
  );
};

export default App;

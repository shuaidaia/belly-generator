import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '管理员百里';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'codeNav',
          title: '成长路程',
          href: 'https://shuaidaia.gitee.io',
          blankTarget: true,
        },
        // {
        //   key: 'Ant Design',
        //   title: '编程宝典',
        //   href: 'https://codefather.cn',
        //   blankTarget: true,
        // },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 项目源码
            </>
          ),
          href: 'https://github.com/shuaidaia',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;

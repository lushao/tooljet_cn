import React from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes, { excludePaths: ['/'] });
  return (
    <ol className="breadcrumb breadcrumb-arrows">
      {breadcrumbs.length === 0 && (
        <li className="breadcrumb-item font-weight-500">
          <Link to={'/'}>程序列表</Link>
        </li>
      )}
      {breadcrumbs.map(({ breadcrumb, dataCy, beta }) => {
        let breadOfChinese = {
          'Apps': '首页',
          'Database': '数据库',
          'Workspace settings': '工作区设置',
          'Global datasources': '全局数据源'
        }
        return (
          <li key={breadcrumb.key} className="breadcrumb-item font-weight-500" data-cy={dataCy ?? ''}>
            <span to={breadcrumb.key}>{breadcrumb?.props?.children in breadOfChinese?breadOfChinese[breadcrumb.props.children]:breadcrumb}</span>
            {beta && <span class="badge bg-color-primary mx-3">beta</span>}
          </li>
        );
      })}
    </ol>
  );
};

// define some custom breadcrumbs for certain routes (optional)
const routes = [
  { path: '/:worspace_id', breadcrumb: 'Apps' },
  { path: '/database', breadcrumb: '数据表', props: { dataCy: 'tables-page-header' } },
  { path: '/workspace-settings', breadcrumb: '工作区设置' },
  { path: '/global-datasources', breadcrumb: '全局数据源' },
  { path: '/integrations', breadcrumb: 'Integrations / plugins', props: { beta: true } },
];

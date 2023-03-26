import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { GlobalDataSourcesContext } from '..';
import Skeleton from 'react-loading-skeleton';
import { ListItem } from '../LIstItem';
import { ConfirmDialog } from '@/_components';
import { globalDatasourceService } from '@/_services';
import EmptyFoldersIllustration from '@assets/images/icons/no-queries-added.svg';

export const List = () => {
  const { dataSources, fetchDataSources, selectedDataSource, setSelectedDataSource, toggleDataSourceManagerModal } =
    useContext(GlobalDataSourcesContext);

  const [loading, setLoading] = useState(true);
  const [isDeletingDatasource, setDeletingDatasource] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisibility] = React.useState(false);

  const darkMode = localStorage.getItem('darkMode') === 'true';

  useEffect(() => {
    fetchDataSources(true)
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        toast.error('无法获取数据源');
        return;
      });
  }, []);

  const deleteDataSource = (selectedSource) => {
    toggleDataSourceManagerModal(false);
    setSelectedDataSource(selectedSource);
    setDeleteModalVisibility(true);
  };

  const executeDataSourceDeletion = () => {
    setDeleteModalVisibility(false);
    setDeletingDatasource(true);
    globalDatasourceService
      .deleteDataSource(selectedDataSource.id)
      .then(() => {
        toast.success('数据源已删除');
        setDeletingDatasource(false);
        setSelectedDataSource(null);
        fetchDataSources(true);
      })
      .catch(({ error }) => {
        setDeletingDatasource(false);
        setSelectedDataSource(null);
        toast.error(error);
      });
  };

  const cancelDeleteDataSource = () => {
    setDeleteModalVisibility(false);
    setSelectedDataSource(null);
  };

  const EmptyState = () => {
    return (
      <div
        style={{
          transform: 'translateY(80%)',
        }}
        className="d-flex justify-content-center align-items-center flex-column mt-3"
      >
        <div className="mb-4">
          <EmptyFoldersIllustration />
        </div>
        <div className="tj-text-md text-secondary">未添加数据源</div>
      </div>
    );
  };

  return (
    <>
      <div className="list-group mb-3">
        {loading && <Skeleton count={3} height={22} />}
        {!loading && (
          <div className="mt-2 w-100" data-cy="datasource-Label">
            {dataSources?.length ? (
              dataSources?.map((source, idx) => (
                <ListItem
                  dataSource={source}
                  key={idx}
                  active={selectedDataSource?.id === source?.id}
                  onDelete={deleteDataSource}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        )}
      </div>
      <ConfirmDialog
        show={isDeleteModalVisible}
        message={'您将丢失从此数据源创建的所有查询是否确实要删除?'}
        confirmButtonLoading={isDeletingDatasource}
        onConfirm={() => executeDataSourceDeletion()}
        onCancel={() => cancelDeleteDataSource()}
        darkMode={darkMode}
      />
    </>
  );
};

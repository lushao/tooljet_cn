import React from 'react';
import TabContent from './TabContent';
import GroupHeader from './GroupHeader';

export default ({
  options = [],
  currentState,
  theme,
  removeKeyValuePair,
  addNewKeyValuePair,
  onChange,
  componentName,
}) => {
  return (
    <>
      <GroupHeader paramType={'headers'} descText="请求标头" />
      <TabContent
        options={options}
        currentState={currentState}
        theme={theme}
        removeKeyValuePair={removeKeyValuePair}
        onChange={onChange}
        componentName={componentName}
        tabType={'headers'}
        paramType={'headers'}
        addNewKeyValuePair={addNewKeyValuePair}
      />
    </>
  );
};

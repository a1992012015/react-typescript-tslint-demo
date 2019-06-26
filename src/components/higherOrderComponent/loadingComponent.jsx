import React from 'react';
import { Spin } from 'antd/lib/index';

const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  return <div className='loading-spin'>{isLoading ? <Spin size='large' /> : error ? <div>Sorry, there was a problem loading the page.</div> : null}</div>;
};

export default MyLoadingComponent;

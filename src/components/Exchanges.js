import { Col, Row, Typography } from 'antd';
import { useGetExchangesQuery } from '../services/cryptoApi';
import React from 'react';

const { Title } = Typography;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchanges = data?.data?.exchanges;
  console.log(exchanges)
  
  if(isFetching) return 'Loading...';

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Changes</Col>
      </Row>
      <Row style={{margin: '400px 0'}}>
        {/* {exchanges?.map((exchange, index) => {
          return 'hello world'
        })} */} 
        <Title level={5}>Unable to complete due to needing a paid subscription.</Title>
      </Row>
    </>
  );
};

export default Exchanges;

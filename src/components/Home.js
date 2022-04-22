import { useGetCryptosQuery } from '../services/cryptoApi';
import { Col, Row, Statistic, Typography } from 'antd';
import { Cryptocurrencies, News } from './';
import { Link } from 'react-router-dom';
import millify from 'millify';
import React from 'react';

const { Title } = Typography;


const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const stats = data?.data?.stats;

  if(isFetching) return "Loading...";

  return <>
    <Title level={2} className='heading'>Global crypto stats</Title>

    <Row>
      <Col span={12}> <Statistic title="Total Cryptocurrencies" value={stats.total} /> </Col>
      <Col span={12}> <Statistic title="Total Exchanges" value={millify(stats.totalExchanges)} /> </Col>
      <Col span={12}> <Statistic title="Total Market Cap" value={millify(stats.totalMarketCap)} /> </Col>
      <Col span={12}> <Statistic title="Total 24h Volume" value={millify(stats.total24hVolume)} /> </Col>
      <Col span={12}> <Statistic title="Total Markets" value={millify(stats.totalMarkets)} /> </Col>
    </Row>

    <div className='home-heading-container'>
      <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
      <Title level={3} className='show-more'> <Link to='/cryptocurrencies'>Show more</Link> </Title>
    </div>
    <Cryptocurrencies simplified />

    <div className='home-heading-container'>
      <Title level={2} className='home-title'>Latest Crypto News</Title>
      <Title level={3} className='show-more'> <Link to='/news'>Show more</Link> </Title>
    </div>
    <News simplified />
  </>;
};

export default Home;

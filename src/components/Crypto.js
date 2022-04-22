import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import { Col, Row, Typography, Select } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { React, useState } from 'react';
import millify from 'millify';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const Crypto = () => {
  const { id } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(id);
  const { data: history } = useGetCryptoHistoryQuery({ id, timeperiod });
  const coin = data?.data?.coin;

  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${coin?.price && millify(coin?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: coin?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${coin?.['24hVolume'] && millify(coin?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${coin?.marketCap && millify(coin?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high (daily avg.)', value: `$ ${coin?.allTimeHigh?.price && millify(coin?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: coin?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: coin?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: coin?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${coin?.supply?.total && millify(coin?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${coin?.supply?.circulating && millify(coin?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  if(isFetching) return 'Loading...';

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {coin.name} ({coin.symbol}) Price
        </Title>
        <p>
          {coin.name} live price in US dollars. View value statistics, market cap and supply.
        </p>
      </Col>

      <Select 
      value={timeperiod}
      className='select-timeperiod' 
      placeholder='Select time period'
      onChange={(value) => setTimeperiod(value)}>
        {time.map((val) => <Option value={val} key={val}>{val}</Option>)}
      </Select>

      <LineChart coinHistory={history} name={coin.name} currentPrice={coin.price} />

      <Col style={{textAlign: 'center'}} className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {coin.name} Value statistics
            </Title>
            <p>An over view of all the stats for {coin.name}</p>
          </Col>
          {stats.map(({ icon, title, value}, index) => {
            return <Col key={index} className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          })}
        </Col>

        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other statistics
            </Title>
            <p>An over view showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value}, index) => {
            return <Col key={index} className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          })}
        </Col>
      </Col>
      
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {coin.name}
            {HTMLReactParser(coin.description)}
          </Title>
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {coin.name} Links
          </Title>
          {coin.links.map((link, index) => {
            return <Row className='coin-link' key={index}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          })}
        </Col>
      </Col>

    </Col>
  );
};

export default Crypto;

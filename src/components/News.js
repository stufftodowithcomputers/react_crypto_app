import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptonewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { React, useState } from 'react';
import moment from 'moment';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const count = simplified ? 6 : 100
  const [category, setCategory] = useState('Cryptocurrency');
  const { data: news, isFetching } = useGetCryptoNewsQuery({ category, count });
  const { data } = useGetCryptosQuery(count);

  if(isFetching) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
          showSearch
          className='select-news'
          placeholder='Select a Crypto'
          optionFilterProp='children'
          onChange={(value) => setCategory(value)}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {data.data.coins.map((coin, index) => <Option key={index} value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}

      {news.value.map((val, index) => {
        return <Col xs={24} sm={12} lg={8} key={index}>
          <Card className='news-card' hoverable>
            <a href={val.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{val.name}</Title>
                <img style={{maxWidth: '200px', maxHeight: '100px'}} src={val?.image?.thumbnail?.contentUrl} alt='news' />
              </div>
              <p>
                {val.description >= 100 ? `${news.description.substring(0, 100)}...` : val.description }
              </p>
              <div className='provider-container'>
                <Avatar src={val?.image?.thumbnail?.contentUrl} alt='' />
                <Text className='provider-name'>{val.provider[0].name}</Text>
              </div>
              <Text>{moment(val.datePublished).startOf('ss').fromNow()}</Text>
            </a>
          </Card>
        </Col>
      })}
    </Row>
  )
};

export default News;

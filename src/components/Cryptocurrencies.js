import { useGetCryptosQuery } from '../services/cryptoApi';
import { React, Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Card, Col, Input } from 'antd';
import millify from 'millify'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if(searchTerm === '') return setCryptos(cryptoList?.data?.coins);

    setCryptos(cryptoList?.data?.coins);
    const filteredData = cryptos.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);

  }, [cryptoList, searchTerm]);
  

  if(isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((val, index) => {
          return <Col xs={24} sm={12} lg={6} className='crypto-card' key={index}>
            <Link to={`/crypto/${val.uuid}`}>
              <Card
              title={`${val.rank}. ${val.name}`}
              extra={<img className='crypto-image' src={val.iconUrl} alt='coin'/>}
              hoverable>
                <p>Price: {millify(val.price)}</p>
                <p>Market cap: {millify(val.marketCap)}</p>
                <p>Daily change: {millify(val.change)}</p>
              </Card>
            </Link>
          </Col>
        })}
      </Row>
    </>
  )
};

export default Cryptocurrencies;

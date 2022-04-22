import { Navbar, Home, Exchanges, Cryptocurrencies, Crypto, News } from './components';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/exchanges' element={<Exchanges />} /> 
              <Route exact path='/cryptocurrencies' element={<Cryptocurrencies />} /> 
              <Route exact path='/crypto/:id' element={<Crypto />} />
              <Route exact path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
            Cryptowide<br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;

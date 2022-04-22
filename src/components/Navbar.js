import { Button, Avatar, Typography, Menu } from 'antd';
import { MenuOutlined, BulbOutlined, FundOutlined, HomeOutlined, MoneyCollectOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react';

import icon from '../images/cryptocurrency.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.addEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if(screenSize < 768) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  }, [screenSize]);
  
  

  return <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} />
        <Typography.Title level={2} className="logo">
            <Link to='/'>Cryptowide</Link>
        </Typography.Title>
        <Button className='menu-control-container' onClick={() => setMenu(!menu)}>
          <MenuOutlined />
        </Button>
      </div>
      {menu && (
        <Menu theme='dark'>
            <Menu.Item icon={<HomeOutlined />}>
              <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
              <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined />}>
              <Link to='/exchanges'>Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
              <Link to='/news'>News</Link>
            </Menu.Item>
        </Menu>
      )}
  </div>;
};

export default Navbar;


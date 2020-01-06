import React from 'react';
import { Link } from 'gatsby';
import { Box, Flex, Text } from 'rebass';
import logo from '../img/logo.svg';

const Navbar = class extends React.Component {
  render() {
    return (
      <nav role="navigation" aria-label="main-navigation">
        <Flex alignItems="center" justifyContent="center">
          <Box mr={2}>
            <Link to="/" title="Logo">
              <img src={logo} alt="Logo" style={{ width: '60px', height: '60px' }} />
            </Link>
          </Box>
          <Text
            fontSize={5}
            fontWeight="bold"
            sx={{ fontFamily: 'Exo, sans-serif', letterSpacing: '1px' }}
          >
            <Link to="/" title="Home" style={{ color: '#333' }}>
              flycoder
            </Link>
          </Text>
        </Flex>
      </nav>
    );
  }
};

export default Navbar;

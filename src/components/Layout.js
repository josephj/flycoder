import React from 'react';
import { Helmet } from 'react-helmet';
import { Flex, Box } from 'rebass';
import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useSiteMetadata from './SiteMetadata';
import theme from '../theme';
import { withPrefix } from 'gatsby';

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <html lang="zh-Hant" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="https://flycoder.io" />
        <meta property="og:image" content="https://flycoder.io/img/og-img.png" />
      </Helmet>
      <Flex justifyContent="center">
        <Box sx={{ maxWidth: '42em' }}>
          <Navbar />
          <div>
            <Global
              styles={css`
                body {
                  color: rgb(76, 73, 72);
                  font-size: 16px;
                  font-family: 'Helvetica Neue', Arial, 'Heiti TC', 'LiHei Pro', 微軟正黑體,
                    'Microsoft Jhenghei', sans-serif;
                  line-height: 1.5;
                }
                a,
                a:link,
                a:visited,
                a:hover {
                  color: #38b6ff;
                  text-decoration: none;
                }
              `}
            />
            {children}
          </div>
          <Footer />
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

export default Layout;

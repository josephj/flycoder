import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';

export const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

const Content = ({ content }) => <Box sx={{ lineHeight: '1.5' }}>{content}</Box>;

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;

import React from 'react';
import PropTypes from 'prop-types';
import { BlogPostTemplate } from '../../templates/podcast-post';

const PodcastPostPreview = ({ entry, widgetFor }) => {
  return (
    <BlogPostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      path={entry.getIn(['data', 'path'])}
      tags={entry.getIn(['data', 'tags'])}
      title={entry.getIn(['data', 'title'])}
      siteUrl={entry.getIn(['data', 'siteUrl'])}
      id={entry.getIn(['data', 'id'])}
    />
  );
};

PodcastPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default PodcastPostPreview;

import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Box } from 'rebass';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  slug,
  title,
  helmet,
  id,
  siteUrl = '',
  path,
}) => {
  const PostContent = contentComponent || Content;
  const disqusConfig = {
    url: `${siteUrl + path}`,
    identifier: id,
    title: title,
  };

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <h1>{title}</h1>
        <Box sx={{ bg: 'lightgray', p: 3, lineHeight: 'body' }}>{description}</Box>

        <Box sx={{ lineHeight: 'body' }}>
          <PostContent content={content} />
        </Box>
        {/* 
        {tags && tags.length ? (
          <div>
            <h4>Tags</h4>
            <ul className="taglist">
              {tags.map(tag => (
                <li key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        */}
      </div>
      {siteUrl && <Disqus config={disqusConfig} />}
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const {
    markdownRemark: post,
    site: {
      siteMetadata: { siteUrl },
    },
  } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        siteUrl={siteUrl}
        id={post.id}
        path={post.frontmatter.path}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        path
        description
        tags
      }
    }
  }
`;

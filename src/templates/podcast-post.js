import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Flex, Box, Text } from 'rebass';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';
import { FacebookProvider, Like } from 'react-facebook';

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
  pageContext,
}) => {
  const { previous, next } = pageContext;
  const PostContent = contentComponent || Content;
  const disqusConfig = {
    url: `${siteUrl + path}`,
    identifier: id,
    title: title,
  };

  return (
    <FacebookProvider appId="608261706671234">
      <section className="section">
        {helmet || ''}
        <div className="container content">
          <h1>{title}</h1>
          <Box sx={{ mb: 3 }}>
            <Like href={`${siteUrl}${path}`} showFaces share layout="standard" size="large" />
          </Box>
          <Box sx={{ bg: 'lightgray', p: 3, lineHeight: 'body' }}>{description}</Box>
          <Box sx={{ lineHeight: 'body' }}>
            <PostContent content={content} />
          </Box>

          <Flex
            as="nav"
            alignItems="flex-start"
            flexDirection={['column', 'row']}
            flexWrap="wrap"
            mb={2}
            px={2}
          >
            <Box alignSelf="self-start" mb={2} mr={2} flex={1}>
              {previous && (
                <Link to={previous.frontmatter.path}>← {previous.frontmatter.title}</Link>
              )}
            </Box>
            <Box alignSelf="self-end" mb={2} ml={2} flex={1} style={{ textAlign: 'right' }}>
              {next && <Link to={next.frontmatter.path}>{next.frontmatter.title} →</Link>}
            </Box>
          </Flex>
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
    </FacebookProvider>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data, pageContext }) => {
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
        pageContext={pageContext}
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

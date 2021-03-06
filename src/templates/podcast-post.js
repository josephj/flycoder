import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Flex, Box } from 'rebass';
import { FacebookProvider, Like, Comments } from 'react-facebook';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
  siteUrl = '',
  path,
  pageContext,
}) => {
  const { previous, next } = pageContext;
  const PostContent = contentComponent || Content;

  return (
    <FacebookProvider appId="608261706671234" language="zh_TW">
      <section className="section">
        {helmet || ''}
        <div>
          <h1>{title}</h1>
          <Box sx={{ mb: 3 }}>
            <Like
              href={`${siteUrl}${path}`}
              showFaces
              share
              layout="standard"
              size="large"
              width="350px"
            />
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
            <Box mb={2} mr={2} flex={1}>
              {previous && (
                <Link to={previous.frontmatter.path}>← {previous.frontmatter.title}</Link>
              )}
            </Box>
            <Box alignSelf="self-end" mb={2} ml={2} flex={1} style={{ textAlign: 'right' }}>
              {next && <Link to={next.frontmatter.path}>{next.frontmatter.title} →</Link>}
            </Box>
          </Flex>
        </div>
        {siteUrl && (
          <>
            <Box sx={{ mb: 3 }}>
              <Like
                href={`${siteUrl}${path}`}
                showFaces
                share
                layout="standard"
                size="large"
                width="350px"
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              {siteUrl && <Comments href={`${siteUrl}${path}`} numposts={10} />}
            </Box>
          </>
        )}
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
            <meta property="og:url" content={`${siteUrl}${post.frontmatter.path}`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${post.frontmatter.title} | flycoder 飛行開發者`} />
            <meta property="og:description" content={`${post.frontmatter.description}`} />
            <meta property="fb:admins" content="108710733990033" />
            <meta property="fb:app_id" content="608261706671234" />
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

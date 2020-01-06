import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import { Flex, Box, Text, Heading } from 'rebass';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import { useMediaQuery } from 'react-responsive';

const BlogRoll = props => {
  const { data } = props;
  const { edges: posts } = data.allMarkdownRemark;
  const isMobile = useMediaQuery({ query: '(max-width: 40em)' });

  return (
    <div>
      <Box mb={2}>
        <iframe
          width="100%"
          height={isMobile ? '240px' : '480px'}
          src="https://www.youtube.com/embed/5aazFK9ZgQM"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Box>
      {posts &&
        posts.map(({ node: post }) => (
          <Box mb={3} key={post.id}>
            <article className={`${post.frontmatter.featuredpost ? 'is-featured' : ''}`}>
              <Heading
                as="h2"
                fontSize={3}
                color="blue"
                my={2}
                sx={{
                  display: 'block',
                  width: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  textDecoration: 'none',
                }}
              >
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </Heading>
              <Flex alignItems="flex-start">
                {post.frontmatter.featuredimage && (
                  <Box width={[100, 200]} mr={3}>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                      }}
                    />
                  </Box>
                )}
                <Box flex={2}>
                  <Text fontSize={0} color="gray" mb={1}>
                    {post.frontmatter.date}
                  </Text>
                  {post.frontmatter.description}
                  &nbsp;<Link to={post.frontmatter.path}>繼續閱讀...</Link>
                </Box>
              </Flex>
            </article>
          </Box>
        ))}
    </div>
  );
};

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "podcast-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
                path
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                featuredpost
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);

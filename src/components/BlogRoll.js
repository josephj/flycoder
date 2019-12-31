import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import { Flex, Box, Heading } from 'rebass';
import PreviewCompatibleImage from './PreviewCompatibleImage';

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline">
        <Box mb={2}>
          <iframe
            width="672"
            height="480"
            src="https://www.youtube.com/embed/5aazFK9ZgQM"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Box>
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <article
                className={`blog-list-item tile is-child box notification ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <Flex alignItems="flex-start">
                  {post.frontmatter.featuredimage && (
                    <Box width={200} mr={3}>
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </Box>
                  )}
                  <Box flex={2}>
                    <Heading as="h2" fontSize={3}>
                      <Link to={post.frontmatter.path} sx={{ textDecoration: 'none' }}>
                        {post.frontmatter.title}
                      </Link>
                    </Heading>
                    <div>{post.frontmatter.date}</div>
                    <p>
                      {post.frontmatter.description}
                      <br />
                      <br />
                      <Link className="button" to={post.frontmatter.path}>
                        Keep Reading →
                      </Link>
                    </p>
                  </Box>
                </Flex>
              </article>
            </div>
          ))}
      </div>
    );
  }
}

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

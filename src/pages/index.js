import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

// import { Layout, PostCard, Pagination } from '../components/common'
import Layout from '../components/common/Layout'
import PostCard from '../components/common/PostCard'
import MetaData from '../components/common/meta/MetaData'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Index = ({ data, location }) => {
    const posts = data.allMarkdownRemark.edges;

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <div className="container">
                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    {/* <Pagination pageContext={pageContext} /> */}
                </div>
            </Layout>
        </>
    )
}

// TODO Gonna use for pagination
Index.propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.object.isRequired,
    }).isRequired, 
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
//     pageContext: PropTypes.object,
}

export default Index

// old way
// {data.allMarkdownRemark.edges.map(({node}, index) => (
//   <div key={index}>
//     <h3><Link to={node.fields.slug}>{node.frontmatter.title}</Link></h3>
//     <i>{node.frontmatter.date}</i>
//     <p>{node.excerpt}</p>
//   </div>
// ))}

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          excerpt
          timeToRead
          wordCount {
            words
          }
          frontmatter {
            title
            date(fromNow: true)
            featuredimage
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

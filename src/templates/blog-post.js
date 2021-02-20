import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Utterances from "utterances-react"

import Layout from '../components/common/Layout'
import MetaData from '../components/common/meta/MetaData'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const BlogPost = ({ data, location }) => {
  const post = data.markdownRemark;
    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="blogPost"
            />
            <Layout>
                <div className="container">
                    <article className="content">
                        { post.frontmatter.featuredimage ?
                            <figure className="post-feature-image">
                                <img src={ post.frontmatter.featuredimage } alt={ post.frontmatter.title } />
                            </figure> : null }
                        <section className="post-full-content">
                            <h1 className="content-title">{post.frontmatter.title}</h1>

                            {/* The main post content */ }
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                        <i>Leave a comment:</i>
                        </section>
                    </article>
                    <Utterances
                      repo="gereesee/gereesee"
                      issueTerm="title"
                      label="comment"
                      theme="github-light"
                      crossorigin="anonymous"
                      async={false}
                      style={`
                      & .utterances {
                        max-width: 950px;
                      }
                    `}
                    />
                </div>
            </Layout>
        </>
    )
}

BlogPost.propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.shape({
        frontmatter: PropTypes.shape({
          featuredimage: PropTypes.string,
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          tags: PropTypes.array,
        }),
        html: PropTypes.string.isRequired,
      }),
    }).isRequired,
    location: PropTypes.object,
}

export default BlogPost

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      excerpt
      frontmatter {
        title
        featuredimage
        description
        tags
        date
      }
    }
  }
`;
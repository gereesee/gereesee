import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import config from '../../utils/siteConfig'

const PostCard = ({ post }) => {
    const url = post.fields.slug;
    // TODO - get this with the default way
    // const readingTime = readingTimeHelper(post)

    const author = post.primary_author ? post.primary_author : config.defaultAuthor;

    return (
        <Link to={url} className="post-card">
            <header className="post-card-header">
                {post.frontmatter.featuredimage &&
                    <div className="post-card-image" style={{
                        backgroundImage: `url(${post.frontmatter.featuredimage})` ,
                    }}></div>}
                {/* TODO implement tags */}
                {/* {post.tags && <div className="post-card-tags"> <Tags post={post} visibility="public" autolink={false} /></div>} */}
                {post.featured && <span>Featured</span>}
                <h2 className="post-card-title">{post.frontmatter.title}</h2>
            </header>
            <section className="post-card-excerpt">{post.frontmatter.description}</section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    <div className="post-card-avatar">
                        {author && author.profile_image ?
                            <img className="author-profile-image" src={author.profile_image} alt={author.name}/> :
                            <img className="default-avatar" src="/images/icons/avatar.svg" alt={author.name}/>
                        }
                    </div>
                    <span>{ author.name }</span>
                </div>
                <div className="post-card-footer-right">
                    <div>{post.timeToRead} min read</div>
                </div>
            </footer>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
        }),
        frontmatter: PropTypes.shape({
            featuredimage: PropTypes.string,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }),
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        timeToRead: PropTypes.number.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }),
    }).isRequired,
}

export default PostCard

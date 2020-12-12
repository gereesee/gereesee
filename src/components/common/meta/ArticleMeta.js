import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import _ from 'lodash'
import url from 'url'

// import getAuthorProperties from './getAuthorProperties'
import ImageMeta from './ImageMeta'
import config from '../../../utils/siteConfig'

// import { tags as tagsHelper } from '@tryghost/helpers'

const ArticleMetaGhost = ({ data, canonical }) => {
    const blogPost = data

    // const author = getAuthorProperties(blogPost.primary_author)
    // const publicTags = _.map(tagsHelper(blogPost, { visibility: `public`, fn: tag => tag }), `name`)
    // const primaryTag = publicTags[0] || ``
    const shareImage = blogPost.frontmatter.featuredimage  ? blogPost.frontmatter.featuredimage  : _.get(config, `cover_image`, null)
    const publisherLogo = config.siteIcon ? url.resolve(config.siteUrl, config.siteIcon) : null

    const jsonLd = {
        "@context": `https://schema.org/`,
        "@type": `Article`,
        // author: {
        //     "@type": `Person`,
        //     name: author.name,
        //     image: author.image ? author.image : undefined,
        //     sameAs: author.sameAsArray ? author.sameAsArray : undefined,
        // },
        // keywords: publicTags.length ? publicTags.join(`, `) : undefined,
        headline: blogPost.meta_title || blogPost.frontmatter.title,
        url: canonical,
        datePublished: blogPost.published_at,
        dateModified: blogPost.updated_at,
        image: shareImage ? {
            "@type": `ImageObject`,
            url: shareImage,
            width: config.shareImageWidth,
            height: config.shareImageHeight,
        } : undefined,
        publisher: {
            "@type": `Organization`,
            name: config.title,
            logo: {
                "@type": `ImageObject`,
                url: publisherLogo,
                width: 60,
                height: 60,
            },
        },
        description: blogPost.meta_description || blogPost.excerpt,
        mainEntityOfPage: {
            "@type": `WebPage`,
            "@id": config.siteUrl,
        },
    }

    return (
        <>
            <Helmet>
                <title>{blogPost.meta_title || blogPost.frontmatter.title}</title>
                <meta name="description" content={blogPost.meta_description || blogPost.excerpt} />
                <link rel="canonical" href={canonical} />

                <meta property="og:site_name" content={config.title} />
                <meta property="og:type" content="article" />
                <meta property="og:title"
                    content={
                        blogPost.og_title ||
                        blogPost.meta_title ||
                        blogPost.frontmatter.title
                    }
                />
                <meta property="og:description"
                    content={
                        blogPost.og_description ||
                        blogPost.excerpt ||
                        blogPost.meta_description
                    }
                />
                <meta property="og:url" content={canonical} />
                <meta property="article:published_time" content={blogPost.published_at} />
                <meta property="article:modified_time" content={blogPost.updated_at} />
                {/* {publicTags.map((keyword, i) => (<meta property="article:tag" content={keyword} key={i} />))} */}
                {/* {author.facebookUrl && <meta property="article:author" content={author.facebookUrl} />} */}

                <meta name="twitter:title"
                    content={
                        blogPost.twitter_title ||
                        blogPost.meta_title ||
                        blogPost.frontmatter.title
                    }
                />
                <meta name="twitter:description"
                    content={
                        blogPost.twitter_description ||
                        blogPost.excerpt ||
                        blogPost.meta_description
                    }
                />
                <meta name="twitter:url" content={canonical} />
                <meta name="twitter:label1" content="Written by" />
                {/* <meta name="twitter:data1" content={author.name} /> */}
                {/* {primaryTag && <meta name="twitter:label2" content="Filed under" />}
                {primaryTag && <meta name="twitter:data2" content={primaryTag} />} */}

                {/* {settings.twitter && <meta name="twitter:site" content={`https://twitter.com/${settings.twitter.replace(/^@/, ``)}/`} />}
                {settings.twitter && <meta name="twitter:creator" content={settings.twitter} />} */}
                <script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
            </Helmet>
            <ImageMeta image={shareImage} />
        </>
    )
}

ArticleMetaGhost.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        published_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        meta_title: PropTypes.string,
        meta_description: PropTypes.string,
        primary_author: PropTypes.object.isRequired,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                slug: PropTypes.string,
                visibility: PropTypes.string,
            })
        ),
        primaryTag: PropTypes.shape({
            name: PropTypes.string,
        }),
        og_title: PropTypes.string,
        og_description: PropTypes.string,
        twitter_title: PropTypes.string,
        twitter_description: PropTypes.string,
        excerpt: PropTypes.string.isRequired,
    }).isRequired,
    settings: PropTypes.shape({
        logo: PropTypes.object,
        title: PropTypes.string,
        twitter: PropTypes.string,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
    canonical: PropTypes.string.isRequired,
}


import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import _ from 'lodash'
import url from 'url'

import ImageMeta from './ImageMeta'
import config from '../../../utils/siteConfig'

const ArticleMetaGhost = ({ data, canonical }) => {
    const blogPost = data.markdownRemark;
    const postFrontmatter = blogPost.frontmatter;

    const author = config.defaultAuthor;
    const publicTags = postFrontmatter.tags;
    const primaryTag = publicTags[0] || ``
    const shareImage = postFrontmatter.featuredimage  ? postFrontmatter.featuredimage  : _.get(config, `cover_image`, null)
    const publisherLogo = config.siteIcon ? url.resolve(config.siteUrl, config.siteIcon) : null

    const jsonLd = {
        "@context": `https://schema.org/`,
        "@type": `Article`,
        author: {
            "@type": `Person`,
            name: author.name,
            image: author.image ? author.image : undefined,
            sameAs: author.sameAsArray ? author.sameAsArray : undefined,
        },
        keywords: publicTags.length ? publicTags.join(`, `) : undefined,
        headline: postFrontmatter.title,
        url: canonical,
        datePublished: postFrontmatter.date,
        dateModified: postFrontmatter.date,
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
        description: blogPost.excerpt,
        mainEntityOfPage: {
            "@type": `WebPage`,
            "@id": config.siteUrl,
        },
    }

    return (
        <>
            <Helmet>
                <title>{postFrontmatter.title}</title>
                <meta name="description" content={blogPost.excerpt} />
                <link rel="canonical" href={canonical} />

                <meta property="og:site_name" content={config.title} />
                <meta property="og:type" content="article" />
                <meta property="og:title"
                    content={
                        postFrontmatter.title
                    }
                />
                <meta property="og:description"
                    content={
                        blogPost.excerpt
                    }
                />
                <meta property="og:url" content={canonical} />
                <meta property="article:published_time" content={postFrontmatter.date} />
                <meta property="article:modified_time" content={postFrontmatter.date} />
                {publicTags.map((keyword, i) => (<meta property="article:tag" content={keyword} key={i} />))}
                {author.authorProfiles.website && <meta property="article:author" content={author.authorProfiles.website} />}

                <meta name="twitter:title"
                    content={
                        postFrontmatter.title
                    }
                />
                <meta name="twitter:description"
                    content={
                        blogPost.excerpt
                    }
                />
                <meta name="twitter:url" content={canonical} />
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content={author.twitterName} />
                {primaryTag && <meta name="twitter:label2" content="Filed under" />}
                {primaryTag && <meta name="twitter:data2" content={primaryTag} />}

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
        markdownRemark: PropTypes.shape({
          frontmatter: PropTypes.shape({
            featuredimage: PropTypes.string,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            tags: PropTypes.array,
            date: PropTypes.string,
          }),
          html: PropTypes.string.isRequired,
          excerpt: PropTypes.string.isRequired,
        }),
      }).isRequired,
    canonical: PropTypes.string.isRequired,
}

export default ArticleMetaGhost

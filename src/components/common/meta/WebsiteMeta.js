import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import _ from 'lodash'
import url from 'url'

import ImageMeta from './ImageMeta'
import config from '../../../utils/siteConfig'

const WebsiteMeta = ({ data, canonical, title, description, image, type }) => {
    const publisherLogo = url.resolve(config.siteUrl, config.siteIcon)
    let shareImage = image

    description = description || data.meta_description || data.description || config.siteDescriptionMeta
    title = `${title || data.meta_title || data.name || data.title}`

    const jsonLd = {
        "@context": `https://schema.org/`,
        "@type": type,
        url: canonical,
        image: shareImage ?
            {
                "@type": `ImageObject`,
                url: shareImage,
                width: config.shareImageWidth,
                height: config.shareImageHeight,
            } : undefined,
        publisher: {
            "@type": `Organization`,
            name: title,
            logo: {
                "@type": `ImageObject`,
                url: publisherLogo,
                width: 60,
                height: 60,
            },
        },
        mainEntityOfPage: {
            "@type": `WebPage`,
            "@id": config.siteUrl,
        },
        description,
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
                <meta property="og:site_name" content={title} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonical} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:url" content={canonical} />
                {/* {settings.twitter && <meta name="twitter:site" content={`https://twitter.com/${settings.twitter.replace(/^@/, ``)}/`} />}
                {settings.twitter && <meta name="twitter:creator" content={settings.twitter} />} */}
                <script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
            </Helmet>
            <ImageMeta image={shareImage} />
        </>
    )
}

WebsiteMeta.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        meta_title: PropTypes.string,
        meta_description: PropTypes.string,
        name: PropTypes.string,
        feature_image: PropTypes.string,
        description: PropTypes.string,
        bio: PropTypes.string,
        profile_image: PropTypes.string,
    }).isRequired,
    canonical: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.oneOf([`WebSite`, `Series`]).isRequired,
}


export default WebsiteMeta

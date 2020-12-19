import React from 'react'
import PropTypes from 'prop-types'
import url from 'url'

import config from '../../../utils/siteConfig'
import ArticleMeta from './ArticleMeta'
// import WebsiteMeta from './WebsiteMeta'
// import AuthorMeta from './AuthorMeta'

/**
* MetaData will generate all relevant meta data information incl.
* JSON-LD (schema.org), Open Graph (Facebook) and Twitter properties.
*
*/
const MetaData = ({
    type,
    data,
    location,
}) => {
    const canonical = url.resolve(config.siteUrl, location.pathname)

    switch (type) {
        case 'blogPost': 
            return (<ArticleMeta
                data={data}
                canonical={canonical}
            />);

        // TODO
        // default: {
        //     title = title || config.siteTitleMeta || settings.title
        //     description = description || config.siteDescriptionMeta || settings.description
        //     image = image || settings.cover_image || null

        //     image = image ? url.resolve(config.siteUrl, image) : null

        //     return (
        //         <WebsiteMeta
        //             data={{}}
        //             canonical={canonical}
        //             title={title}
        //             description={description}
        //             image={image}
        //             type="WebSite"
        //         />
        //     )
        // }
        
    }
}

MetaData.defaultProps = {
    data: {},
}

MetaData.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.object,
        ghostTag: PropTypes.object,
        ghostAuthor: PropTypes.object,
        ghostPage: PropTypes.object,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string,
}

export default MetaData

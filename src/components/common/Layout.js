import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'

import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const Layout = ({ children, isHome }) => {
    return (
        <>
            <Helmet>
                <html lang={config.lang} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className="site-head" style={{ ...config.cover_image && { backgroundImage: `url(${config.cover_image})` } }}>
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    <Link to="/">
                                        <img className="site-logo" src={config.logo} alt={config.title} />
                                    </Link>
                                </div>
                                <div className="site-mast-right">
                                    {/* <a className="site-nav-item" href={ `https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/` } target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/rss.svg" alt="RSS Feed" /></a> */}
                                </div>
                            </div>
                            { isHome ?
                                <div className="site-banner">
                                    <h1 className="site-banner-title">{config.title}</h1>
                                    <p className="site-banner-desc">{config.description}</p>
                                </div> :
                                null}
                            <nav className="site-nav">
                                <div className="site-nav-left">
                                    {/* <Navigation data={site.navigation} navClass="site-nav-item" /> */}
                                </div>
                                <div className="site-nav-right">
                                    <Link className="site-nav-button" to="/">About</Link>
                                </div>
                            </nav>
                        </div>
                    </header>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>

                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">{config.title}</Link> © 2020
                            </div>
                            <div className="site-foot-nav-right">
                                {/* <Navigation data={site.navigation} navClass="site-foot-nav-item" /> */}
                            </div>
                        </div>
                    </footer>

                </div>
            </div>

        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    isHome: PropTypes.bool,
}

export default Layout

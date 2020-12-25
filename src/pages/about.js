import React from 'react'
import Layout from '../components/common/Layout'

const AboutPage = () => (
    <>
        <Layout>
            <div className="container">
                <article className="content">
                    {/* { post.frontmatter.featuredimage ?
                        <figure className="post-feature-image">
                            <img src={ post.frontmatter.featuredimage } alt={ post.frontmatter.title } />
                        </figure> : null } */}
                    <section className="post-full-content">
                        <h1 className="content-title">About gereesee.com</h1>

                        <section
                            className="content-body load-external-scripts"
                        >
                            <p>First of all, <i>"gereesee"</i> means <i>"from home"</i> in Mongolian language.</p>
                            <p>We're striving to put battle-tested tips and tricks useful for remote workers.</p>
                            <p>You can contact us through <a href="mailto:info@gereesee.com">info@gereesee.com</a></p>
                        </section>
                    </section>
                </article>
            </div>
        </Layout>
    </>
)

export default AboutPage

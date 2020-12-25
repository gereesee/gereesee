import _ from 'lodash'

const authorProfiles = {
    website: 'https://code.zolbayar.com/',
    twitter: 'https://twitter.com/zolkash',
};

export default {
    siteUrl: `http://localhost:8000`, // Site domain. Do not include a trailing slash!

    postsPerPage: 12, // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)

    siteTitleMeta: `gereesee | from-home`, // This allows an alternative site title for meta data for pages.
    siteDescriptionMeta: `Practical tips and tricks for remote workers`, // This allows an alternative site description for meta data for pages.

    shareImageWidth: 1000, // Change to the width of your default share image
    shareImageHeight: 523, // Change to the height of your default share image

    shortTitle: `gereesee`, // Used for App manifest e.g. Mobile Home Screen
    siteIcon: `favicon.png`, // Logo in /static dir used for SEO, RSS, and App manifest
    backgroundColor: `#e9e9e9`, // Used for Offline Manifest
    themeColor: `#15171A`, // Used for Offline Manifest

    lang: `en`,
    cover_image: `/img/gereesee_oddiig_tooly_cover.jpg`,
    logo: `/img/gereesee_logo.png`,
    title: `gereesee.com`,
    description: `Practical tips and tricks for remote workers`,

    defaultAuthor: {
        name: `Zolo`,
        twitterName: 'zolkash',
        profile_image: `https://miro.medium.com/fit/c/680/680/1*Ib9yI-doVRseYDoasRwfPg.jpeg`,
        image: `https://miro.medium.com/fit/c/680/680/1*Ib9yI-doVRseYDoasRwfPg.jpeg`,
        sameAsArray: authorProfiles.length ? `["${_.join(authorProfiles, `", "`)}"]` : null,
        authorProfiles
    }
}

import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import { HTMLContent } from '../components/Content';
import Helmet from 'react-helmet';
import favicon from '../img/favicon.ico';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import BlogPostTeaser from '../components/BlogPostTeaser';
import BackgroundImage from 'gatsby-background-image';
import Img from 'gatsby-image';
import { Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import SEO from '../components/SEO';
import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

export const ReferencePageTemplate = ({ data, settings }) => {
    var backgroundCount = 1;
    const essentialPoints = data.frontmatter.essentialPoints.map((essentialPoint, key) => (
        <div key={key} className={(backgroundCount % 2 == 0) ? 'thesis' : 'thesis-background'}>
            <div style={{display: 'none'}}>{backgroundCount++}</div>
            <h3>{essentialPoint.question}</h3>
            <div dangerouslySetInnerHTML={{
                __html:
                    remark()
                        .use(recommended)
                        .use(remarkHtml)
                        .processSync(essentialPoint.answer).toString()
            }}></div>
        </div>
    ));

    let quoteText = "";
    if (data.frontmatter.quote) {
        quoteText = remark()
            .use(recommended)
            .use(remarkHtml)
            .processSync(data.frontmatter.quote.quoteText).toString();
    }

    // show the first three related posts as top posts
    let topPosts = [];
    if (data.fields.relatedPosts) {
        topPosts = data.fields.relatedPosts.slice(0, 3).map((post) => (
            <BlogPostTeaser key={post.id} type='top' post={post} />
        ));
    }

    const seoTags =
        <SEO isBlogPost={false} postData={{
            excerpt: data.frontmatter.service,
            frontmatter: data.frontmatter,
            slug: data.fields.slug,
        }} postImage={settings.global.url + data.frontmatter.thumbnail.childImageSharp.fluid.src} />;

    return (
        <Layout noHeader={true}>
            <section className='category' lang="de">
                {seoTags}
                <Helmet title={`Referenz: ${data.frontmatter.client} | ${settings.global.title}`} link={[
                    { rel: 'shortcut icon', type: 'image/ico', href: `${favicon}` },
                ]} />
                <div className="page-content">
                    <h3>{data.frontmatter.client}</h3>
                    <div className="content-block-wrapper-essential-points">
                        {essentialPoints}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

ReferencePageTemplate.propTypes = {
    client: PropTypes.string,
    industry: PropTypes.string,
    service: PropTypes.string,
    significantImprovement: PropTypes.string,
    quote: PropTypes.arrayOf(PropTypes.object),
    featuredVideo: PropTypes.string,
    essentialPoints: PropTypes.arrayOf(PropTypes.shape({
        question: PropTypes.string,
        answer: PropTypes.string,
    })),
    relatedPosts: PropTypes.arrayOf(PropTypes.object),
};

const ReferencePage = ({ data }) => {
    const {
        settings,
        markdownRemark: post
    } = data;

    return (
        <ReferencePageTemplate contentComponent={HTMLContent} data={post} settings={settings} />
    );
};

ReferencePage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ReferencePage;

export const referencePageQuery = graphql`
    query ReferencePage($id: String!) {
        settings: settingsJson(id: {eq: "general-settings"}) {
            global {
                title
                url
            }
        }
        markdownRemark(id: { eq: $id }) {
            fields {
                relatedPosts {
                    excerpt(pruneLength: 400)
                    id
                    fields {
                        slug
                        category {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                            }
                        }
                        whitepaper {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                            }
                        }
                        image {
                            childImageSharp {
                                fluid(maxWidth: 630) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    frontmatter {
                        title
                        templateKey
                        tags
                        date(formatString: "MMMM DD, YYYY")
                    }
                }
                slug
            }
            frontmatter {
                thumbnail {
                    childImageSharp {
                        fluid(maxWidth: 630) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                client
                clientLogo {
                    childImageSharp {
                        fluid(maxWidth: 630) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                industry
                service
                significantImprovement
                quote {
                    quoteText
                    name
                    role
                }
                featuredVideo
                essentialPoints {
                    question
                    answer
                }
                relatedPosts {
                    post
                }
            }
        }
    }
`;

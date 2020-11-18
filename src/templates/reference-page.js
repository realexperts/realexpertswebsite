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
import { CSSTransition } from 'react-transition-group'
import AnimateHeight from 'react-animate-height'; 

export class ReferencePageTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            essentialPointsVisible: {},
        };

        const { data, settings } = this.props;

        Object.entries(data.frontmatter.essentialPoints).map(([key, essentialPoint]) => {
            const newEssentialPointsVisible = this.state.essentialPointsVisible //copy the array
            newEssentialPointsVisible[key] = false //execute the manipulations
            this.setState({ essentialPointsVisible: newEssentialPointsVisible })
        })

        this.triggerPoint = this.triggerPoint.bind(this);
    }

    triggerPoint(key) {
        const newEssentialPointsVisible = this.state.essentialPointsVisible //copy the array
        newEssentialPointsVisible[key] = !newEssentialPointsVisible[key] //execute the manipulations
        this.setState({ essentialPointsVisible: newEssentialPointsVisible })
    }

    render() {
        const { data, settings } = this.props;

        const essentialPoints = data.frontmatter.essentialPoints.map((essentialPoint, key) => (
            <div key={key} className={'thesis'}>
                <h3 onClick={() => this.triggerPoint(key)}>{essentialPoint.question}</h3>
                <CSSTransition in={this.state.essentialPointsVisible[key]} timeout={200} classNames="essential-points-animation" unmountOnExit>
    <div className={"essential-points-content"} dangerouslySetInnerHTML={{
                    __html:
                        remark()
                            .use(recommended)
                            .use(remarkHtml)
                            .processSync(essentialPoint.answer).toString()
                }}></div>
               </CSSTransition>

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
                        {topPosts.length > 0 &&

                            <div className="posts">
                                <h2>Top Beiträge</h2>
                                <div className="top-posts">
                                    {topPosts}
                                </div>
                            </div>

                        }
                    </div>
                </section>
            </Layout>
        );
    }
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

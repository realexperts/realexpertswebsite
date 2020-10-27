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
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import sliderRight from "../img/icons/slider-right.svg";
import sliderLeft from "../img/icons/slider-left.svg";
import SEO from '../components/SEO';
import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

export const CategoryPageTemplate = ({ data, settings }) => {

    const thesisElements = data.frontmatter.thesis.map((thesisElement, key) => (
        <div key={key} className={`thesis ${thesisElement.highlighted ? 'highlighted' : 'normal'}`}>
            <h3>{thesisElement.headline}</h3>
            <div dangerouslySetInnerHTML={{
                __html:
                    remark()
                        .use(recommended)
                        .use(remarkHtml)
                        .processSync(thesisElement.body).toString()
            }}></div>
        </div>
    ));

    let infoBoxBody = "";
    if (data.frontmatter.infoBox) {
        infoBoxBody = remark()
            .use(recommended)
            .use(remarkHtml)
            .processSync(data.frontmatter.infoBox.body).toString();
    }

    let successStories = [];
    if (data.fields.successStories) {
        successStories = data.fields.successStories.map((successStory, key) => (
            <Slide index={key} key={key} className="success-story">
                <Link to={successStory.fields.slug}>
                    <Img fluid={data.fields.successStoriesImages[key].childImageSharp.fluid} />
                </Link>
                <Link to={successStory.fields.slug}>
                    <h4>{data.frontmatter.successStories[key].customerName}</h4>
                </Link>
            </Slide>
        ));
    }

    let statements = [];
    if (data.frontmatter.statements) {
        statements = data.frontmatter.statements.map((statement, key) => (
            <Slide index={key} key={key}>
                <div className="statement">
                    <div className="statement-image">
                        <Img fluid={data.fields.statementsImages[key].childImageSharp.fluid}
                            imgStyle={{ objectFit: 'contain' }} />
                    </div>
                    <div className="statement-message">
                        <span className="statement-text">
                            <span dangerouslySetInnerHTML={{
                                __html: remark()
                                    .use(recommended)
                                    .use(remarkHtml)
                                    .processSync(("\"" + statement.body + "\"")).toString()
                            }}>
                            </span>
                        </span>
                        <span className="statement-author" dangerouslySetInnerHTML={{ __html: statement.author }}></span>
                    </div>
                </div>
            </Slide>
        ));
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
            excerpt: data.frontmatter.description,
            frontmatter: data.frontmatter,
            slug: data.fields.slug,
        }} postImage={settings.global.url + data.frontmatter.headerImage.childImageSharp.fluid.src} />;


    let numSlides = 4;
    if (typeof window !== `undefined`) {
        if (window.innerWidth > 768) {
            numSlides = 4
        } else if (window.innerWidth > 480) {
            numSlides = 3
        } else {
            numSlides = 1
        }
    }

    console.log(statements);

    return (
        <Layout>
            <section className='category' lang="de">
                {seoTags}
                <Helmet title={`${data.frontmatter.title} | ${settings.global.title}`} link={[
                    { rel: 'shortcut icon', type: 'image/ico', href: `${favicon}` },
                ]} />
                <div className="hero">
                    <BackgroundImage Tag="div"
                        style={{
                            backgroundPosition: 'center left',
                        }}
                        fluid={data.frontmatter.headerImage.childImageSharp.fluid}>
                        <div className="claim">
                            <h3>{data.frontmatter.title}</h3>
                            <h1>{data.frontmatter.contentTitle}</h1>
                            <p>{data.frontmatter.description}</p>
                        </div>
                    </BackgroundImage>
                </div>
                <div className="page-content">
                    <div className="content-block-wrapper">
                        {thesisElements}
                    </div>
                    {!(successStories.length == 0 && (data.frontmatter.video == null || data.frontmatter.video.length < 3)) &&
                        <div className="featured-video-wrapper category-video-wrapper">
                            {(data.frontmatter.video != null && data.frontmatter.video.length > 3) &&
                                <div className='featured-video'>
                                    <div style={{
                                        position: 'relative',
                                        paddingTop: '56.25%',
                                    }}>
                                        <ReactPlayer url={data.frontmatter.video}
                                            width='100%'
                                            height='100%'
                                            style={{
                                                position: 'absolute',
                                                top: '0',
                                                left: '0',
                                            }}
                                            config={{
                                                youtube: {
                                                    embedOptions: {
                                                        host: 'https://www.youtube-nocookie.com',
                                                    },
                                                    preload: true
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            }


                            {successStories.length > 0 &&
                                <div className="success-stories-wrapper">
                                    <h2>{data.frontmatter.successStoriesTitle}</h2>
                                    <div className="success-stories">
                                        <CarouselProvider
                                            naturalSlideWidth={400}
                                            naturalSlideHeight={300}
                                            totalSlides={successStories.length}
                                            visibleSlides={numSlides}
                                        >
                                            <div className="back-button-wrapper">
                                                <ButtonBack><img src={sliderLeft} alt="Zurück" /></ButtonBack>
                                            </div>
                                            <Slider>
                                                {successStories}
                                            </Slider>
                                            <div className="next-button-wrapper">
                                                <ButtonNext><img src={sliderRight} alt="Weiter" /></ButtonNext>
                                            </div>
                                        </CarouselProvider>

                                    </div>
                                </div>
                            }
                        </div>
                    }
                    {(successStories.length == 0 && (data.frontmatter.video == null || data.frontmatter.video.length < 3)) && <div style={{ marginTop: '65px' }}></div>}
                    {data.frontmatter.infoBox.headline != null && data.frontmatter.infoBox.headline.length > 0 &&
                        <div className="category-info-box-wrapper">
                            <div className="category-info-box">
                                <div className="info-box-content">
                                    <h2>{data.frontmatter.infoBox.headline}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: infoBoxBody }}></div>
                                </div>
                                <div className="info-box-image">
                                    <Img fluid={data.fields.infoBoxImage.childImageSharp.fluid} />
                                </div>
                            </div>
                        </div>
                    }

                    {data.frontmatter.title.includes("Digitale Kompetenzen") &&
                        <a href={`/downloads/Real_Experts_Whitepaper_Digitale_Kompetenzen.pdf`} download className="download-button">Download &dArr;</a>
                    }

                    {data.frontmatter.title.includes("Digitalstrategie") &&
                        <a className="download-button">Bald verfügbar</a>
                    }

                    {statements.length > 0 &&
                        <div className="statements-wrapper">
                            {data.frontmatter.title.includes("Whitepaper") &&
                                <h2>Autoren</h2>
                            }
                            <div className="statements-content">

                                <CarouselProvider
                                    naturalSlideWidth={100}
                                    naturalSlideHeight={data.frontmatter.title.includes("Whitepaper") ? 42 : 20}
                                    totalSlides={statements.length}
                                >
                                    <div className="back-button-wrapper">
                                        <ButtonBack><img src={sliderLeft} alt="Zurück" /></ButtonBack>
                                    </div>
                                    <Slider>
                                        {statements}
                                    </Slider>
                                    <div className="next-button-wrapper">
                                        <ButtonNext><img src={sliderRight} alt="Weiter" /></ButtonNext>
                                    </div>
                                </CarouselProvider>
                            </div>
                        </div>
                    }

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
};

CategoryPageTemplate.propTypes = {
    title: PropTypes.string,
    contentTitle: PropTypes.string,
    description: PropTypes.string,
    thesis: PropTypes.arrayOf(PropTypes.shape({
        headline: PropTypes.string,
        highlighted: PropTypes.bool,
        body: PropTypes.string,
    })),
    video: PropTypes.string,
    successStoriesTitle: PropTypes.string,
    successStories: PropTypes.arrayOf(PropTypes.object),
    infoBox: PropTypes.arrayOf(PropTypes.object),
    statements: PropTypes.arrayOf(PropTypes.object),
    relatedPosts: PropTypes.arrayOf(PropTypes.object),
};

const CategoryPage = ({ data }) => {
    const {
        settings,
        markdownRemark: post
    } = data;

    return (
        <CategoryPageTemplate contentComponent={HTMLContent} data={post} settings={settings} />
    );
};

CategoryPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default CategoryPage;

export const categoryPageQuery = graphql`
    query CategoryPage($id: String!) {
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
                successStories {
                    fields {
                        slug
                    }
                }
                successStoriesImages {
                    childImageSharp {
                        fluid(maxWidth: 630) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                } 
                infoBoxImage {
                    childImageSharp {
                        fluid(maxWidth: 630) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                statementsImages {
                    childImageSharp {
                        fluid(maxWidth: 200) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                slug
            }
            frontmatter {
                title
                contentTitle
                headerImage {
                    childImageSharp {
                        fluid(maxWidth: 630) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                description
                thesis {
                    headline
                    highlighted
                    body
                }
                video
                successStoriesTitle
                successStories {
                    post
                    customerName
                    storyImage
                }
                infoBox {
                    headline
                    body
                    image
                }
                statements {
                    author
                    body
                }
                relatedPosts {
                    post
                }
            }
        }
    }
`;

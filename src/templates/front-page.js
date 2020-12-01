import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withPrefix, graphql, Link } from 'gatsby';
import ReactPlayer from 'react-player';
import BlogPostTeaser from '../components/BlogPostTeaser';
import Layout from '../components/layout';

import favicon from '../img/favicon.ico';
import BackgroundImage from 'gatsby-background-image';
import SEO from '../components/SEO';

import * as klaro from 'klaro/dist/klaro-no-css'

export const FrontPageTemplate = ({
  title,
  claim,
  thesis,
  video,
  relatedPosts,
  data,
  settings
}) => {

  console.log(settings);

  const thesisElements = thesis.map((thesisElement, key) => (
    <div key={key} className={`thesis ${thesisElement.highlighted ? 'highlighted' : 'normal'}`}>
      <h3>{thesisElement.headline}</h3>
      <p>{thesisElement.body}</p>
    </div>
  ));

  // show the first three related posts as top posts
  let topPosts = [];
  if(relatedPosts){
    topPosts = relatedPosts.slice(0, 3).map((post) => (
      <BlogPostTeaser key={post.id} type='top' post={post}/>
    ));
  }

  const seoTags =
    <SEO isBlogPost={false} postData={{
      excerpt: data.frontmatter.claim.teaser,
      frontmatter: data.frontmatter,
      slug: data.fields.slug,
    }} postImage={settings.global.url+data.frontmatter.headerImage.childImageSharp.fluid.src}/>;

  return (
    <Layout>
      <section className="front" lang="de">
        {seoTags}
        <Helmet title={title} link={[
          {rel: 'shortcut icon', type: 'image/ico', href: `${favicon}`},
        ]} bodyAttributes={{
          class: 'front-page',
        }}>
         {/* <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="178192ac-766f-4cab-a110-039ac99eaf64" type="text/javascript" async></script> */}
         {/* <script defer type="application/javascript"
          src={withPrefix('klaro-config.js')}></script>
          <script 
              defer
              data-config="klaroConfig"
              type="application/javascript"
              src="https://cdn.kiprotect.com/klaro/v0.7/klaro.js">
          </script> */}
          </Helmet>
        <div className="hero">
          <BackgroundImage Tag="div" style={{
            backgroundPosition: 'top left',
          }} fluid={data.frontmatter.headerImage.childImageSharp.fluid}>
            <div className="claim">
              <p>{claim.teaser}</p>
              <Link to={claim.linkto} className="button-round-red">Mehr erfahren</Link>
            </div>
          </BackgroundImage>
        </div>
        <div className="page-content">
          <div className="content-block-wrapper">
              {thesisElements}
          </div>

          <div className="featured-video-wrapper">
            <div className='featured-video'>
              <div style={{
                position: 'relative',
                paddingTop: '56.25%',
              }}>
                <ReactPlayer url={video} width='100%' height='100%'
                config={{ 
                  youtube: { 
                    embedOptions: { 
                      host: 'https://www.youtube-nocookie.com' 
                    } 
                  } 
                }} 
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                }}/>
              </div>
            </div>
          </div>

          <div className="posts">
            <h2>Top Beiträge</h2>
            <div className="top-posts">
              {topPosts}
            </div>
          </div>
        </div>

      </section>
    </Layout>
  );
};

FrontPageTemplate.propTypes = {
  site: PropTypes.shape({
    siteMetadata: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  title: PropTypes.string.isRequired,
  claim: PropTypes.shape({
    teaser: PropTypes.string,
    linkto: PropTypes.string,
  }),
  thesis: PropTypes.arrayOf(PropTypes.shape({
    headline: PropTypes.string,
    highlighted: PropTypes.bool,
    body: PropTypes.string,
  })),
  video: PropTypes.string.isRequired,
  relatedPosts: PropTypes.arrayOf(PropTypes.object),
  settings: PropTypes.object
};

const FrontPage = ({data}) => {

  const {
    settings,
    markdownRemark: post
  } = data;

  return (
    <FrontPageTemplate data={post} title={`${post.frontmatter.title} | ${data.settings.global.title}`} claim={post.frontmatter.claim} thesis={post.frontmatter.thesis} video={post.frontmatter.video} relatedPosts={post.fields.relatedPosts} settings={settings}/>
  );
};

FrontPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FrontPage;

export const frontPageQuery = graphql`
    query FrontPage($id: String!) {
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
                        image {
                            childImageSharp {
                                fluid(maxWidth: 630) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
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
                        reference {
                          fields {
                              slug
                          }
                          frontmatter {
                              client
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
            }
            frontmatter {
                title
                headerImage {
                    childImageSharp {
                        fluid(maxWidth: 630) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                claim {
                    teaser
                    linkto
                }
                thesis {
                    headline
                    highlighted
                    body
                }
                video
                relatedPosts {
                    post
                }
            }
        }
    }
`;

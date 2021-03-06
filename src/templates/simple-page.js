import React from 'react';
import PropTypes from 'prop-types';
import Content, { HTMLContent } from '../components/Content';
import favicon from '../img/favicon.ico';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export const SimplePageTemplate = ({title, content, contentComponent, settings}) => {
  const PageContent = contentComponent || Content;

  setTimeout(() => {
    if (typeof window !== `undefined`) {
      window.postscribe('#podcast-player', '<script defer class="podigee-podcast-player" src="https://cdn.podigee.com/podcast-player/javascripts/podigee-podcast-player.js" data-configuration="https://retalk.podigee.io/2-bike24/embed?context=external"></script>');
    }
  },2000);

  return (
    <Layout noHeader={true}>
      <section className='simple' lang="de">
        <Helmet title={`${title}  | ${settings.global.title}`} link={[
          {rel: 'shortcut icon', type: 'image/ico', href: `${favicon}`},
        ]}>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/postscribe/2.0.8/postscribe.min.js" integrity="sha256-xOIPU/XvDtRLeDQ3qj9GOKmlbMSqKa6D7ZIS6ygHBSo=" crossOrigin="anonymous"></script>
        </Helmet>
        <div className="page-content">
          <h2>{title}</h2>
          <div className="content-block-wrapper">
            <PageContent className="content" content={content}/>
          </div>
        </div>
      </section>
    </Layout>
  );
};

SimplePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const SimplePage = ({data}) => {
  const {
    settings,
    markdownRemark: post
  } = data;

  return (
    <SimplePageTemplate contentComponent={HTMLContent}
                        title={`${post.frontmatter.title}`}
                        content={post.html}
                        settings={settings}/>
  );
};

SimplePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SimplePage;

export const simplePageQuery = graphql`
  query SimplePage($id: String!) {
      settings: settingsJson(id: {eq: "general-settings"}) {
      global {
        title
        url
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

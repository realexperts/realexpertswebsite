import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import WhitepaperPageTeaser from '../components/WhitepaperPageTeaser';
import favicon from '../img/favicon.ico';
import arrowLeft from '../img/icons/arrow-left.svg';
import arrowRight from '../img/icons/arrow-right.svg';
import Layout from '../components/layout';

export default class WhitepaperIndexPage extends React.Component {
    render() {
        const { data } = this.props;

        const whitepapers = data.allMarkdownRemark.edges;

        const { limit, skip, currentPage, numPages } = this.props.pageContext;

        console.log(limit, skip, currentPage, numPages);

        const isFirst = currentPage === 1;
        const isLast = currentPage === numPages;
        const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString();
        const nextPage = (currentPage + 1).toString();

        return (
            <Layout noHeader={true}>
                <section className="blog" lang="de">
                    <Helmet title={`Whitepaper | ${data.settings.global.title}`} link={[
                        { rel: 'shortcut icon', type: 'image/ico', href: `${favicon}` },
                    ]} />
                    <div className="page-content">
                        <div className="content-block-wrapper">
                            <div className="content-block">
                                <h2>Alle Whitepaper</h2>
                                <div className="all-posts">
                                    {whitepapers.map(({ node: post }) => (
                                        <WhitepaperPageTeaser key={post.id} post={post} type='normal' />
                                    ))}
                                </div>
                                {numPages > 1 &&
                                    <ul className="pagination">
                                        {!isFirst && (
                                            <Link to={`/whitepaper/${prevPage}`} rel="prev" className="pagination-prev"> <img src={arrowLeft} alt="Previous" /> </Link>
                                        )} {Array.from({ length: numPages }, (_, i) => (
                                            <li className="pagination-item" key={`pagination-number${i + 1}`}>
                                                <Link to={`/whitepaper/${i === 0 ? '' : i + 1}`} className={i + 1 === currentPage
                                                    ? 'pagination-item-link active'
                                                    : 'pagination-item-link'}>
                                                    {i + 1}
                                                </Link>
                                            </li>
                                        ))} {!isLast && (
                                            <Link className="pagination-next" to={`/whitepaper/${nextPage}`} rel="next"> <img src={arrowRight} alt="Next" /> </Link>
                                        )}
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }
}

WhitepaperIndexPage.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                title: PropTypes.string,
            }),
        }),
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
};

export const pageQuery = graphql`
  query WhitepaperIndexQuery($skip: Int!, $limit: Int!) {
      settings: settingsJson(id: {eq: "general-settings"}) {
      global {
        title
        url
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "whitepaper-page" } }}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 140)
          id
          fields {
            slug
            thumbnail {
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
            description
            tags
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;

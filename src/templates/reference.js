import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ReferencePageTeaser from '../components/ReferencePageTeaser';
import favicon from '../img/favicon.ico';
import arrowLeft from '../img/icons/arrow-left.svg';
import arrowRight from '../img/icons/arrow-right.svg';
import Layout from '../components/layout';

export default class ReferenceIndexPage extends React.Component {
    render() {
        const { data } = this.props;

        const references = data.allMarkdownRemark.edges;

        const { limit, skip, currentPage, numPages } = this.props.pageContext;

        console.log(limit, skip, currentPage, numPages);

        const isFirst = currentPage === 1;
        const isLast = currentPage === numPages;
        const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString();
        const nextPage = (currentPage + 1).toString();

        return (
            <Layout noHeader={true}>
                <section className="blog" lang="de">
                    <Helmet title={`Referenzen | ${data.settings.global.title}`} link={[
                        { rel: 'shortcut icon', type: 'image/ico', href: `${favicon}` },
                    ]} />
                    <div className="page-content">
                        <div className="content-block-wrapper">
                            <div className="content-block">
                                <h2>Alle Referenzen</h2>
                                <div className="all-reference-posts">
                                    {references.map(({ node: post }) => (
                                        <ReferencePageTeaser key={post.id} post={post} type='normal' />
                                    ))}
                                </div>
                                {numPages > 1 &&
                                    <ul className="pagination">
                                        {!isFirst && (
                                            <Link to={`/reference/${prevPage}`} rel="prev" className="pagination-prev"> <img src={arrowLeft} alt="Previous" /> </Link>
                                        )} {Array.from({ length: numPages }, (_, i) => (
                                            <li className="pagination-item" key={`pagination-number${i + 1}`}>
                                                <Link to={`/reference/${i === 0 ? '' : i + 1}`} className={i + 1 === currentPage
                                                    ? 'pagination-item-link active'
                                                    : 'pagination-item-link'}>
                                                    {i + 1}
                                                </Link>
                                            </li>
                                        ))} {!isLast && (
                                            <Link className="pagination-next" to={`/reference/${nextPage}`} rel="next"> <img src={arrowRight} alt="Next" /> </Link>
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

ReferenceIndexPage.propTypes = {
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
  query ReferenceIndexQuery($skip: Int!, $limit: Int!) {
      settings: settingsJson(id: {eq: "general-settings"}) {
      global {
        title
        url
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "reference-page" } }}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 140)
          id
          fields {
            slug
            clientLogo {
              childImageSharp {
                  fluid(maxWidth: 630) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          }
          frontmatter {
            additionalInformation
            client
            templateKey
            tags
          }
        }
      }
    }
  }
`;

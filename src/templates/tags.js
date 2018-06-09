import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
        </Link>
      </li>
    ))
    const tag = this.props.pathContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} Beitr${
      totalCount === 1 ? 'ag' : 'äge'
    } in Kategorie “${tag}”`

    return (
      <section className="section">
        <Helmet title={`${tag} | ${title}`} />
        <div className="container"
             style={{ marginBottom: '6rem' }}>
          <h1 className="title is-size-3 has-text-weight-bold is-bold-light">
            {tagHeader}
          </h1>
          <ul className="taglist">{postLinks}</ul>
          <p style={{ marginTop: "1.5rem" }}>
            <Link to="/tags/">Alle Kategorien</Link>
          </p>
        </div>
      </section>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

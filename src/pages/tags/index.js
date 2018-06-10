import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

const TagsPage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { title } } },
}) => (
  <section className="section">
    <Helmet title={`Kategorien | ${title}`} />
    <div className="container content"
         style={{ marginBottom: '6rem' }}>
      <h1 className="title is-size-3 has-text-weight-bold is-bold-light">
        Kategorien
      </h1>
      <div className="tags">
        {group.map(tag => (
          <Link
            key={tag.fieldValue}
            to={`/tags/${kebabCase(tag.fieldValue)}/`}
            style={{ margin: "0 0.5rem 0.5rem 0" }}>
            <div className="tags has-addons">
              <span className="tag is-medium is-light">{tag.fieldValue}</span>
              <span className="tag is-medium is-primary">{tag.totalCount}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

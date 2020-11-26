import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "gatsby"
import Img from 'gatsby-image';
import arrow from "../img/icons/arrow-right.svg";

export default class BlogPostTeaser extends React.Component {

  render() {
    const post = this.props.post;
    const type = this.props.type || 'normal';

    return (
      <div className={`post ${type}`}>
        <div className={`image-type-${type}`}>
          {post.fields.image &&
          <Link to={post.fields.slug}>
            <Img fluid={post.fields.image.childImageSharp.fluid}/>
          </Link>}
        </div>
        <div className="post-content">
          <div className="post-category-name">
          {(post.fields.category && !post.fields.whitepaper && !post.fields.reference) && (
            <Link to={post.fields.category.fields.slug} >
              <h5>{post.fields.category.frontmatter.title}</h5>
            </Link>
          )}
          {(!post.fields.category && post.fields.whitepaper && !post.fields.reference) && (
            <Link to={post.fields.whitepaper.fields.slug} >
              <h5>Whitepaper: {post.fields.whitepaper.frontmatter.title}</h5>
            </Link>
          )}
          {(!post.fields.category && !post.fields.whitepaper && post.fields.reference) && (
            <Link to={post.fields.reference.fields.slug} >
              <h5>Referenz: {post.fields.reference.frontmatter.client}</h5>
            </Link>
          )}
            {(!post.fields.category && !post.fields.whitepaper && !post.fields.reference) && (
              <Link to="/" >
                <h5>Fehlt!</h5>
              </Link>
            )}
          </div>
          <Link to={post.fields.slug}>
            <h4>{post.frontmatter.title}</h4>
          </Link>
          {type !== 'related'
          && <p className='post-content-excerpt'>{post.excerpt}</p>
          }
          {type === 'featured'
          &&
          <Link className="more" to={post.fields.slug}>Artikel lesen<img className="arrow" src={arrow} alt=""/></Link>}
        </div>
      </div>
    )
  }
}

BlogPostTeaser.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({
      image: PropTypes.object,
      slug: PropTypes.string,
    }),
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      date: PropTypes.string,
    }),
  }),
  type: PropTypes.oneOf(['normal', 'featured', 'top', 'related']),
};

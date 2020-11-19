import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "gatsby"
import Img from 'gatsby-image';
import arrow from "../img/icons/arrow-right.svg";

export default class ReferencePageTeaser extends React.Component {

    render() {
        const post = this.props.post;

        return (
            <div className={`reference-post normal`}>
                <Link to={post.fields.slug}>
                <div className={`reference-list-image-container`}>
                    <Img  className={"reference-list-client-image"} fluid={post.fields.clientLogo.childImageSharp.fluid} />
                    <div className="reference-list-text" >Mehr Informationen</div>
                </div>
        </Link>
      </div>
    )
    }
}

ReferencePageTeaser.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string,
        fields: PropTypes.shape({
            clientLogo: PropTypes.object,
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

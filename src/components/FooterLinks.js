import React from 'react';
import { useFooterLinks } from '../hooks/use-footer-links';
import { Link } from 'gatsby';

const FooterLink = ({title, link}) => {
  if(link.toString().startsWith('http')){
    return (
        <li>
          <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
        </li>
    );
  }
  return (
    <li>
      <Link to={link}>{title}</Link>
    </li>
  );
};

const FooterLinkSection = ({data}) => {
  if (data.links) {
    const links = data.links.map((item, key) => {
      return (
        <FooterLink title={item.title} link={item.url} key={key}/>
      )}
    );

    return (
      <ul>
        {links}
      </ul>
    );
  } else {
    return null
  }

};

const FooterLinks = () => {

  const {
    settings,
    mobileImage,
    desktopImage
  } = useFooterLinks();

  var linkSections;
  if (settings && settings.footerLinks) {
    linkSections = settings.footerLinks.map((item, key) => (
      <div className="footer-links-menu-column" key={key}>
        <span className="footer-links-menu-title">{item.title}</span>
        <FooterLinkSection data={item}/>
      </div>
    ));
  }


  return (
    <div className="footer-links">
      <section>
        {
          linkSections != null &&
        <div className="footer-links-content">
          {linkSections}
        </div>
        }
        <div>
          <a href="http://www.strukturfonds.sachsen.de/europaeischer-sozialfonds-esf.html" className="footer-links-logo-esf-smartphone">
            <img src={mobileImage.childImageSharp.fluid.src} alt="Logo ESF Sachsen mobil" />
          </a>
          <a href="http://www.strukturfonds.sachsen.de/europaeischer-sozialfonds-esf.html" className="footer-links-logo-esf">
            <img src={desktopImage.childImageSharp.fluid.src} alt="Logo ESF Sachsen" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default FooterLinks;

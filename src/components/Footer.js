import React from 'react'
import { Link } from "gatsby"
import { useFooterMenu } from '../hooks/use-footer-menu';
import logo from '../img/realexperts-speechbubble.svg'

const Footer = () => {

  const {
    settings,
  } = useFooterMenu();

  const menuLinks = settings.footerMenu.map((item, key) => {
    return (
      <li key={key}><Link to={item.url}>{item.title}</Link></li>
    )
  });

  return(
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Real Experts" style={{ height: '75px', width: '53px' }} />
          <div className="footer-powered-by">
            Powered by Real Experts<br/>
            Network GmbH
          </div>
        </div>
        <nav>
          <ul>
            {menuLinks}
          </ul>
        </nav>
      </div>
    </footer>
  )
};


export default Footer

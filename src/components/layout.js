import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withPrefix, Link } from 'gatsby';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieConsent from 'react-cookie-consent';
import 'typeface-open-sans';
import 'typeface-changa';
import '../layouts/all.scss';
import FooterLinks from './FooterLinks';
import { globalHistory } from "@reach/router"
import FooterNewsletterForm from './FooterNewsletterForm';

const TemplateWrapper = ({children, noHeader}) => {
  const path = globalHistory.location.pathname;
  console.log(path);

  return (
    <div className={noHeader ? "content no-header" : "content"}>
      <Helmet
        /* script={[
          {'id': 'Cookiebot', 'src': 'https://consent.cookiebot.com/uc.js', 'data-cbid': '178192ac-766f-4cab-a110-039ac99eaf64', 'data-blockingmode': 'auto', 'type': 'text/javascript', 'async':'false'}
        ]} */
        
        title="Home | Gatsby + Netlify CMS"
      >
        <script defer type="application/javascript"
          src={withPrefix('klaro-config.js')}></script>
          <script 
              defer
              data-config="klaroConfig"
              type="application/javascript"
              src="https://cdn.kiprotect.com/klaro/v0.7/klaro.js">
          </script>        
      </Helmet>
      <header id="header-main"><Navbar/></header>
      <main>
        {children}
      </main>
      {//((path.indexOf("kontakt") === -1) && (path.indexOf("whitepaper") === -1)) &&
        <FooterNewsletterForm/>
      }
      <FooterLinks/>
      <Footer/>
     {/*  <CookieConsent
        buttonText="Verstanden"
        cookieName="reCoockieConsent"
        style={{background: '#40A6B9'}}
        buttonStyle={{background: '#FFF', color: '#0E3F93', fontSize: '13px',}}>
        Wir verwenden Cookies, um Ihnen einen optimalen Service zu bieten. Wenn Sie auf dieser Seite weitersurfen, stimmen Sie der Verwendung von Cookies zu. Mehr zu <Link to="/datenschutz">Datenschutz</Link>.
      </CookieConsent> */} 
    </div>
  )
};

TemplateWrapper.propTypes = {
  children: PropTypes.object,
  noHeader: PropTypes.bool
};

export default TemplateWrapper;

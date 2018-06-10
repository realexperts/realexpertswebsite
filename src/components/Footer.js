import React from 'react'
import Link from 'gatsby-link'

const Footer = () => (
  <nav className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <p>© COPYRIGHT since 2017 <strong>REAL EXPERTS</strong> | All rights reserved.</p>
        <p>
          <Link to="/impressum">Impressum</Link> | <Link to="/datenschutz">Datenschutzerklärung</Link>
        </p>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  </nav>
)

export default Footer

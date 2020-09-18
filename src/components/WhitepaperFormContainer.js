import React from 'react';
import WhitepaperForm from './WhitepaperForm';

const FooterNewsletterForm = () => {

  return (
    <div className="contact-form-footer">
      <div className="contact-form-footer-content" style={{background: 'white'}}>
        <section className="section">
          <div className="contact-content">
            {/* <div className="contact-information">
              <h3 className="contact-title">Anmelden für das Whitepaper</h3>
              <div className="contact-content-text">
                Melden Sie sich hier für unseren Newsletter an. Einmal pro Quartal senden wir Ihnen Neuigkeiten zu unserem Unternehmen, Themen des digitalen Arbeitsplatzes sowie des neuen Arbeitens in Unternehmen zu. Nach der abgeschlossenen Anmeldung bekommen Sie den Downloadlink zugeschickt.
              </div>
            </div> */}
            <div className="contact-form-wrapper">
              <WhitepaperForm/>
            </div>
          </div>
        </section>
        </div>
    </div>
  );
};

export default FooterNewsletterForm;


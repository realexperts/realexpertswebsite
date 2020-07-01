import React from 'react';
import NewsletterForm from './NewsletterForm';

const FooterNewsletterForm = () => {

  return (
    <div className="contact-form-footer">
      <div className="contact-form-footer-content">
        <section className="section">
          <div className="contact-content">
            <div className="contact-information">
              <h3 className="contact-title">Bleiben Sie auf dem neuesten Stand</h3>
              <div className="contact-content-text">
                Melden Sie sich hier für unseren Newsletter an. Einmal pro Quartal senden wir Ihnen Neuigkeiten zu unserem Unternehmen, Themen des digitalen Arbeitsplatzes sowie des neuen Arbeitens in Unternehmen.
              </div>
            </div>
            <div className="contact-form-wrapper">
              <NewsletterForm/>
            </div>
          </div>
        </section>
        </div>
    </div>
  );
};

export default FooterNewsletterForm;


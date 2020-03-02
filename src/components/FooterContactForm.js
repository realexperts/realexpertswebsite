import React from 'react';
import { useContactData } from '../hooks/use-contact-data';
import ContactForm from './ContactForm';

const FooterContactForm = () => {

  const {
    contactInfo: {
      title
    },
  } = useContactData();

  return (
    <div className="contact-form-footer">
      <div className="contact-form-footer-content">
        <section className="section">
          <div className="contact-content">
            <div className="contact-information">
              <h3 className="contact-title">{title}</h3>
            </div>
            <div className="contact-form-wrapper">
              <ContactForm/>
            </div>
          </div>
        </section>
        </div>
    </div>
  );
};

export default FooterContactForm;


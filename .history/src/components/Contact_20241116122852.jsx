import React from "react";
import "./contact.css";

const ContactUs = () => {
  return (
    <section className="contact-us" id="contact">
      <div className="container">
        <h2 className="contact-heading">Contact us</h2>
        <p className="contact-description">
          Sed quis nisi nisi. Proin consectetur porttitor dui sit amet viverra. Fusce sit amet lorem faucibus, vestibulum ante in, pharetra ante.
        </p>
        <div className="contact-content">
          {/* Left: Contact Form */}
          <form className="contact-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="Full Name"
                className="form-input"
              />
              <input type="email" placeholder="Email" className="form-input" />
            </div>
            <div className="form-row">
              <input type="text" placeholder="Subject" className="form-input" />
            </div>
            <div className="form-row">
              <textarea
                placeholder="Message"
                className="form-textarea"
              ></textarea>
            </div>
            <button type="submit" className="form-submit">
              SUBMIT
            </button>
          </form>
          {/* Right: Contact Info */}
          <div className="contact-info">
            <div className="info-box">
              <p>
                <strong>ADDRESS</strong>
                <br />
                New Delhi, India
              </p>
            </div>
            <div className="info-box">
              <p>
                <strong>PHONE</strong>
                <br />
                009900990099
              </p>
            </div>
            <div className="info-box">
              <p>
                <strong>E-MAIL</strong>
                <br />
                yogeshsingh.now@gmail.com
              </p>
            </div>
            <div className="info-box">
              <p>
                <strong>WORKING HOURS</strong>
                <br />
                Mon-Fri 9.00 AM to 5.00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

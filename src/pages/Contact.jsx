import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend server
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center display-4 fw-bold mb-5 text-primary">Contact Us</h2>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <p className="lead text-center text-secondary mb-4">
            Have a question, feedback, or need assistance? Reach out to us through the form below or using our contact details. We're here to help!
          </p>

          <div className="card shadow-lg p-4 mb-5 border-0">
            <div className="card-body">
              <h3 className="h4 fw-bold mb-4 text-center">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-secondary">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Country Code and Phone */}
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="countryCode" className="form-label text-secondary">Country Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="countryCode"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-8">
                    <label htmlFor="phone" className="form-label text-secondary">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-secondary">Your Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label text-secondary">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label text-secondary">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">Send Message</button>
                </div>
              </form>
            </div>
          </div>

          <h3 className="h4 fw-bold mb-3 text-center text-primary">Other Ways to Contact Us</h3>
          <div className="row text-center text-secondary">
            <div className="col-md-4 mb-4">
              <div className="p-3 border rounded h-100 shadow-sm">
                <i className="bi bi-envelope-fill display-5 text-primary mb-3"></i>
                <p className="fw-bold">Email Us</p>
                <p>support@email.com</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-3 border rounded h-100 shadow-sm">
                <i className="bi bi-telephone-fill display-5 text-primary mb-3"></i>
                <p className="fw-bold">Call Us</p>
                <p>+254 7XX XXX XXX</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-3 border rounded h-100 shadow-sm">
                <i className="bi bi-geo-alt-fill display-5 text-primary mb-3"></i>
                <p className="fw-bold">Visit Our Office</p>
                <p>123 Safari Road, Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
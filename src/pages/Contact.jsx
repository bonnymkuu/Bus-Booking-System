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

  const offices = [
    { name: 'MWEMBE TAYARI OFFICE 1', contact: '0717073333/0731333888' },
    { name: 'MWEMBE TAYARI OFFICE 2', contact: '0702555005' },
    { name: 'COURIER MOMBASA OFFICE', contact: '0798222002/010010000' },
    { name: 'BONDENI OFFICE', contact: '0114500555' },
    { name: 'CHANGAMWE OFFICE', contact: '0793666006' },
    { name: 'MARIAKANI OFFICE', contact: '0759000101' },
    { name: 'NYALI OFFICE', contact: '0752000555' },
    { name: 'BAMBURI OFFICE', contact: '0790616151' },
    { name: 'UTANGE/MAJAONI OFFICE', contact: '0112500555' },
    { name: 'MTWAPA OFFICE', contact: '0792100100' },
    { name: 'KILIFI OFFICE', contact: '0717072020' },
    { name: 'TIMBONI OFFICE', contact: '0711505500' },
    { name: 'MALINDI OFFICE', contact: '0711500888/0791202020' },
    { name: 'VOI OFFICE', contact: '0799999011' },
    { name: 'MACHAKOS JUNCTION OFFICE', contact: '0711515115' },
    { name: 'MLOLONGO OFFICE', contact: '0113555005' },
    { name: 'NAIROBI OFFICE TOWN', contact: '0718127350' },
    { name: 'NAIROBI OFFICE PARCEL', contact: '0790505050' },
    { name: 'SOUTH C OFFICE', contact: '0711502626' },
    { name: 'EASTLEIGH OFFICE', contact: '0790606060' },
    { name: 'INDUSTRIAL AREA OFFICE', contact: 'N/A' }, // Added N/A for missing number
    { name: 'PRESTIGE OFFICE', contact: '0741555005' },
    { name: 'THIKA OFFICE', contact: '0750010101' },
    { name: 'MAKONGENI OFFICE', contact: '0703305555' },
    { name: 'NAKURU OFFICE', contact: '0717027770' },
    { name: 'GILGIL OFFICE', contact: '0741555666' },
    { name: 'KISUMU OFFICE', contact: '0722584333' },
    { name: 'BUSIA OFFICE', contact: '0104972075' },
    { name: 'ELDORET OFFICE', contact: '0717078855' },
    { name: 'MALABA OFFICE', contact: '0758001110' },
    { name: 'KAMPALA OFFICE', contact: 'N/A' }, // Added N/A for missing number
    { name: 'MINJILA OFFICE', contact: '0743110001' },
    { name: 'KIBAONI OFFICE', contact: '0790110001' },
    { name: 'MPEKETONI OFFICE', contact: '0737666333' },
    { name: 'WITU OFFICE', contact: '0795220002' },
    { name: 'HINDI OFFICE', contact: '0114110001' },
    { name: 'MOKOWE OFFICE', contact: '0740220002' },
    { name: 'LAMU OFFICE', contact: '0716500555' }
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center display-4 fw-bold mb-5 text-danger">Contact Us</h2>
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
                  <button type="submit" className="btn btn-danger btn-lg">Send Message</button>
                </div>
              </form>
            </div>
          </div>

          <h3 className="h4 fw-bold mb-3 text-center text-danger">Other Ways to Contact Us</h3>
          <div className="row text-center text-secondary">
            <div className="col-md-4 mb-4">
              <div className="p-3 border rounded h-100 shadow-sm">
                <i className="bi bi-envelope-fill display-5 text-danger mb-3"></i>
                <p className="fw-bold">Email Us</p>
                <p>support@buscarkenya.com</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-3 border rounded h-100 shadow-sm">
                <i className="bi bi-telephone-fill display-5 text-danger mb-3"></i>
                <p className="fw-bold">Call Us</p>
                <p>+254 7XX XXX XXX</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-3 border rounded h-100 shadow-sm">
                <i className="bi bi-geo-alt-fill display-5 text-danger mb-3"></i>
                <p className="fw-bold">Visit Our Office</p>
                <p>123 Safari Road, Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </div>
       {/* Office Grid */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold text-danger mb-4">Contact Our Offices</h2>
        <div className="row">
          {offices.map((office, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="border rounded p-3 h-100 shadow-sm">
                <h5 className="fw-bold text-dark mb-2">{office.name}</h5>
                <div className="text-muted small">
                  {office.contact.split('/').map((num, idx) => (
                    <div key={idx}>
                      <i className="bi bi-telephone-fill me-2 text-danger"></i>
                      <a href={`tel:${num.trim()}`} className="text-decoration-none text-secondary">
                        {num.trim()}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
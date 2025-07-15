import React from 'react';

export default function Privacy() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h2 className="display-4 fw-bold mb-5 text-primary">Privacy Policy</h2>
          <p className="lead mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-5">
            <h3 className="fw-bold mb-3 text-secondary">1. Introduction</h3>
            <p>
              At SafiriExpress, we are committed to protecting your privacy. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our bus booking services, including our website 
              and mobile application.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="fw-bold mb-3 text-secondary">2. Information We Collect</h3>
            <p>We collect various types of information in connection with the services we provide:</p>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item bg-transparent border-start-0 border-end-0">
                <strong>Personal Information:</strong> Name, age, gender, phone number, nationality, ID/passport details
              </li>
              <li className="list-group-item bg-transparent border-start-0 border-end-0">
                <strong>Booking Information:</strong> Travel dates, seat numbers, routes, payment details
              </li>
              <li className="list-group-item bg-transparent border-start-0 border-end-0">
                <strong>Payment Information:</strong> M-Pesa transaction details (we do not store full payment credentials)
              </li>
              <li className="list-group-item bg-transparent border-start-0 border-end-0">
                <strong>Technical Information:</strong> IP address, device information, browser type, usage data
              </li>
            </ul>
          </section>

          <section className="mb-5">
            <h3 className="fw-bold mb-3 text-secondary">3. How We Use Your Information</h3>
            <p>We use the information we collect for the following purposes:</p>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Service Provision</h5>
                <ul>
                  <li>Process and manage your bookings</li>
                  <li>Send booking confirmations and tickets</li>
                  <li>Provide customer support</li>
                </ul>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Legal Compliance</h5>
                <ul>
                  <li>Verify passenger identity as required by transport regulations</li>
                  <li>Maintain records for tax and accounting purposes</li>
                  <li>Comply with government travel requirements</li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Service Improvement</h5>
                <ul>
                  <li>Analyze usage patterns to improve our services</li>
                  <li>Develop new features and offerings</li>
                  <li>Personalize your experience</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-5">
            <h3 className="fw-bold mb-3 text-secondary">4. Data Security</h3>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data, including:
            </p>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <h5>Encryption</h5>
                  <p>All data transmissions are encrypted using SSL/TLS technology</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <h5>Access Control</h5>
                  <p>Strict access controls limit who can view passenger information</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <h5>Secure Payments</h5>
                  <p>Payment processing through secure M-Pesa API with no card data storage</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <h5>Regular Audits</h5>
                  <p>Regular security assessments of our systems</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-5">
            <h3 className="fw-bold mb-3 text-secondary">5. Data Retention</h3>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes we collected it for, 
              including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Data Type</th>
                    <th>Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Booking records</td>
                    <td>5 years for tax and regulatory compliance</td>
                  </tr>
                  <tr>
                    <td>Payment transactions</td>
                    <td>7 years for financial record keeping</td>
                  </tr>
                  <tr>
                    <td>Customer support interactions</td>
                    <td>3 years for service improvement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-5">
            <h3 className="fw-bold mb-3 text-secondary">6. Your Rights</h3>
            <p>You have certain rights regarding your personal information:</p>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="p-3 border rounded h-100">
                  <h5>Access</h5>
                  <p>Request a copy of your personal data we hold</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 border rounded h-100">
                  <h5>Correction</h5>
                  <p>Request correction of inaccurate data</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 border rounded h-100">
                  <h5>Deletion</h5>
                  <p>Request deletion of your personal data</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 border rounded h-100">
                  <h5>Objection</h5>
                  <p>Object to certain processing activities</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 border rounded h-100">
                  <h5>Portability</h5>
                  <p>Request transfer of your data to another service</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 border rounded h-100">
                  <h5>Complaint</h5>
                  <p>Lodge a complaint with regulatory authorities</p>
                </div>
              </div>
            </div>
            <p className="mt-3">
              To exercise these rights, please contact us at privacy@SafiriExpress.com.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="fw-bold mb-3 text-secondary">7. Third-Party Sharing</h3>
            <p>
              We may share your information with third parties only in the following circumstances:
            </p>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item bg-transparent border-start-0 border-end-0">
                <strong>Service Providers:</strong> Payment processors, SMS gateways, cloud hosting providers
              </li>
              <li className="list-group-item bg-transparent border-start-0 border-end-0">
                <strong>Legal Requirements:</strong> When required by law or government authorities
              </li>
              <li className="list-group-item bg-transparent border-start-0 border-end-0">
                <strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale
              </li>
            </ul>
            <p>
              We never sell your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="fw-bold mb-3 text-secondary">8. International Transfers</h3>
            <p>
              Your information may be transferred to and maintained on computers located outside of your country where 
              data protection laws may differ. We ensure appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="fw-bold mb-3 text-secondary">9. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="fw-bold mb-3 text-secondary">10. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <address>
              <strong>SafiriExpress Ltd</strong><br />
              P.O. Box 12345, Nairobi, Kenya<br />
              Email: privacy@SafiriExpress.com<br />
              Phone: +254 700 123 456
            </address>
          </section>
        </div>
      </div>
    </div>
  );
}
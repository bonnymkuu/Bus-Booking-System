import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (formData.email && formData.password) {
      if (formData.email === 'user@example.com' && formData.password === 'password') {
        navigate('/bookings');
      } else {
        setError('Invalid email or password');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-3">Sign in to your account</h2>
        <p className="text-center text-muted mb-4">
          Or <Link to="/register" className="text-danger">create a new account</Link>
        </p>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
  <label htmlFor="email" className="form-label">Email address</label>
  <div className="input-group">
    <span className="input-group-text bg-light"><i className="bi bi-envelope"></i></span>
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
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><i className="bi bi-lock"></i></span>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>


          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="remember-me" />
              <label className="form-check-label" htmlFor="remember-me">Remember me</label>
            </div>
            <Link to="#" className="text-danger text-decoration-none">Forgot password?</Link>
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

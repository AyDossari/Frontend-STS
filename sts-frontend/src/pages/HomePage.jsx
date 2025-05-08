import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      <div className="mb-4 text-center"></div>

      <div className="d-flex gap-4 mb-5">

        {/* Customer Signup Card */}
        <Link to="/signup/customer" className="text-decoration-none text-dark">
          <div className="card text-center shadow" style={{ width: '220px', cursor: 'pointer' }}>
            <div className="card-body">
              <div className="mb-3">
                <i className="bi bi-person-plus display-4 text-secondary"></i>
              </div>
              <h4 className="card-title">Sign up</h4>
              <p className="text-muted">Click here as Customer </p>
            </div>
          </div>
        </Link>

        <Link to="/login" className="text-decoration-none text-dark">
          <div className="card text-center shadow" style={{ width: '220px', cursor: 'pointer' }}>
            <div className="card-body">
              <div className="mb-3">
                <i className="bi bi-box-arrow-in-right display-4 text-secondary"></i>
              </div>
              <h4 className="card-title">Login</h4>
              <p className="text-muted">Click here to login</p>
            </div>
          </div>
        </Link>

        <Link to="/signup/driver" className="text-decoration-none text-dark">
          <div className="card text-center shadow" style={{ width: '220px', cursor: 'pointer' }}>
            <div className="card-body">
              <div className="mb-3">
                <i className="bi bi-truck display-4 text-secondary"></i>
              </div>
              <h4 className="card-title">Sign up</h4>
              <p className="text-muted">Click here as driver</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;

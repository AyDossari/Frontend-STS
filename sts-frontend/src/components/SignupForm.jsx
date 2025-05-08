import React from 'react';

function SignupForm(props) {
  return (
<div className="container d-flex align-items-center justify-content-center min-vh-100">
  <div className="card shadow p-4" style={{ maxWidth: '700px', width: '100%' }}>
    <h3 className="mb-4 text-center">{props.title}</h3>
    <form onSubmit={props.handleSubmit}>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              id="username"
              name="username"
              value={props.username}
              onChange={(e) => props.setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              id="email"
              name="email"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              id="password"
              name="password"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-person-lines-fill"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              id="full_name"
              name="full_name"
              value={props.full_name}
              onChange={(e) => props.setFullName(e.target.value)}
              required
            />
          </div>
        </div>

        {props.showAddress && (
          <div className="col-md-6 mb-3">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-geo-alt-fill"></i></span>
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                id="address"
                name="address"
                value={props.address}
                onChange={(e) => props.setAddress(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-telephone-fill"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              id="phone_number"
              name="phone_number"
              value={props.phone_number}
              onChange={(e) => props.setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        {props.showVehicleType && (
          <div className="col-md-6 mb-3">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-car-front-fill"></i></span>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicle Type"
                id="vehicle_type"
                name="vehicle_type"
                value={props.vehicle_type}
                onChange={(e) => props.setVehicleType(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-dark w-100">Sign Up</button>
    </form>
  </div>
</div>
  );
}

export default SignupForm;

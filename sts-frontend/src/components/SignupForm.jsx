import React from 'react';

function SignupForm(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <form onSubmit={props.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            required
            value={props.username}
            onChange={(event) => props.setUsername(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={props.email}
            onChange={(event) => props.setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={props.password}
            onChange={(event) => props.setPassword(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="full_name">Full Name</label>
          <input
            id="full_name"
            name="full_name"
            required
            value={props.full_name}
            onChange={(event) => props.setFullName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            value={props.address}
            onChange={(event) => props.setAddress(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="phone_number">Phone Number</label>
          <input
            id="phone_number"
            name="phone_number"
            value={props.phone_number}
            onChange={(event) => props.setPhoneNumber(event.target.value)}
          />
        </div>

        {props.showVehicleType && (
          <div>
            <label htmlFor="vehicle_type">Vehicle Type</label>
            <input
              id="vehicle_type"
              name="vehicle_type"
              value={props.vehicle_type}
              onChange={(event) => props.setVehicleType(event.target.value)}
            />
          </div>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;

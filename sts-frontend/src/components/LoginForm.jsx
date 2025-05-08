import React from 'react';

function LoginForm(props) {
  return (
    <div className="container-md d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-center">{props.title}</h3>
        <form onSubmit={props.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label"> Username</label>
            <input
              id="username"
              name="username"
              required
              value={props.username}
              onChange={(event) => props.setUsername(event.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={props.password}
              onChange={(event) => props.setPassword(event.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">Log in</button>
          {props.error && (
            
            <div><i className="bi bi-exclamation-diamond  me-2"> {props.error}</i> </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

import React from 'react';

function LoginForm(props) {
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
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default LoginForm;

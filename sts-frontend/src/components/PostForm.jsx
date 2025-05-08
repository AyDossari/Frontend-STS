import React from 'react';

function PostForm(props) {
  return (
    <div className="container-md d-flex align-items-center justify-content-center min-vh-100">
    <form onSubmit={props.handleSubmit} className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          id="name"
          name="name"
          required
          className="form-control"
          value={props.name}
          onChange={(event) => props.setName(event.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          id="description"
          name="description"
          required
          className="form-control"
          value={props.description}
          onChange={(event) => props.setDescription(event.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="weight" className="form-label">Weight (kg)</label>
        <input
          id="weight"
          name="weight"
          type="number"
          step="0.01"
          required
          className="form-control"
          value={props.weight}
          onChange={(event) => props.setWeight(event.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-dark w-100">Submit</button>
    </form>
  </div>
  );
}

export default PostForm;

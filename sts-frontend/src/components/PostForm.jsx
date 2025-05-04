import React from 'react';

function PostForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          required
          value={props.name}
          onChange={(event) => props.setName(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          required
          value={props.description}
          onChange={(event) => props.setDescription(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="weight">Weight (kg)</label>
        <input
          id="weight"
          name="weight"
          type="number"
          step="0.01"
          required
          value={props.weight}
          onChange={(event) => props.setWeight(event.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default PostForm;

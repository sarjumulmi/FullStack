import React from 'react';

const PersonForm = ({newName, number, handleNameChange, handleNumberChange, handleFormSubmit}) => (
  <form onSubmit={handleFormSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
      <br />
      number: <input value={number} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm
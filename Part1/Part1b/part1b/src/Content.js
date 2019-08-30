import React from 'react';

import Part from './Part'

const Content = ({parts}) => (
  <div>
    {parts.map(part => (
      <Part part={part.name} excercises={part.exercises} />
    ))}
  </div>
)

export default Content
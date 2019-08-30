import React from 'react';

import Part from './Part'

const Content = (props) => (
  <div>
    <Part part={props.part1} exercises1={props.exercises1} />
  </div>
)

export default Content
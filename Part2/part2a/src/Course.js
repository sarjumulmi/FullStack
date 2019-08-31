import React from 'react';

import Header from './Header'
import Footer from './Footer'
import Content from './Content'

const Course = ({course}) => (
  <div>
  <Header course={course.name}/>
  <Content parts={course.parts}/>
  <Footer parts={course.parts} />
  </div>
)

export default Course
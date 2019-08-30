import React from 'react';

import Header from './Header'
import Footer from './Footer'
import Content from './Content'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} exercises1={exercises1}/>
      <Content part1={part2} exercises1={exercises2}/>
      <Content part1={part3} exercises1={exercises3}/>
      <Footer exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}


export default App;

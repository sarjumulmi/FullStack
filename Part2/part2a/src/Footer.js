import React from 'react';

const Footer = ({parts}) => {
  const numOfExercises = parts.reduce((prevValue, currentItem)=> {
    return prevValue + currentItem.exercises
  }, 0)
  return (
    <p>
      <strong>Total of Exercises {numOfExercises}</strong>
    </p>
  )
}

export default Footer
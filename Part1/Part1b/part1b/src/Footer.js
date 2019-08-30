import React from 'react';

const Footer = ({parts}) => {
  const numOfExercises = parts.reduce((prevValue, currentItem, index)=> {
    return prevValue + currentItem.exercises
  }, 0)
  return (
    <p>
      Number of Exercises {numOfExercises}
    </p>
  )
}

export default Footer
import React from 'react'

const Notification = ({msg}) => {
  if (msg === null) {
    return null
  }
  const {text, type} = msg
  console.log('message: ', msg);
  return (
    <div className={type}>
      {text}
    </div>
  )
}

export default Notification;
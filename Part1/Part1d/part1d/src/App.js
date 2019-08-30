import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const average = (good-bad)/(good+bad+neutral)
  const all = good+bad+neutral
  const positive = (good * 100)/(good+bad+neutral)
  
  if (good === 0 && bad ===0 && neutral ===0) {
    return (
      <div>
      <h1>Statistics</h1>
      <p>No Feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>  
      </table> 
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
    <Button text="good" handleClick={() => setGood(good + 1)} />
    <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
    <Button text="bad" handleClick={() => setBad(bad + 1)} />

    <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App;

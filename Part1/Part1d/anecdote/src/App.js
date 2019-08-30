import React, {useState} from 'react';


const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const Anecdote = ({anecdote, vote, show}) => {
  if (show) {
    return (
      <div>
        <p>{anecdote}</p>
        <p>has {vote} votes</p>
      </div> 
    )
  } 
  return (<div>Nothing to show</div>)
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const getRandomQuotes = () => {
    const randomIndex = Math.floor(Math.random()*anecdotes.length)
    console.log('index is: ', randomIndex)
    setSelected(randomIndex)
  }
  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const anecdoteWithMostVotes = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} vote={votes[selected]} show={true}/>
      <Button text="vote" handleClick={vote} />
      <Button text="next Anecdote" handleClick={getRandomQuotes} />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[anecdoteWithMostVotes]} vote={votes[anecdoteWithMostVotes]} show={votes[anecdoteWithMostVotes] > 0} />
    </div>
  )
}

export default App;

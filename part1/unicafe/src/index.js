import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        No feedback given
        </>
    )
  }
  else return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good}/>
          <Statistic text="neutral" value={neutral}/>
          <Statistic text="bad" value={bad}/>
          <Statistic text="all" value={good+neutral+bad}/>
          <Statistic text="average" value={(good-bad)/(good+neutral+bad)}/>
          <Statistic text="positive" value={good/(good+neutral+bad) + " %"}/>
        </tbody>
      </table>
    </>
  )
}

const Statistic = ({text, value}) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </>
)

const Button = ({doOnClick, text}) => (
  <button onClick={doOnClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  return (
    <div>
      <h1>give feedback</h1>
      <Button doOnClick={() => setGood(good+1)} text="good" />
      <Button doOnClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button doOnClick={() => setBad(bad+1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad}/> 
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
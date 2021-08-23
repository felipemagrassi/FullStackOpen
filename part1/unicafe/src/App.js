import React, { useState } from 'react'
import Statistics from './Component/Statistics'
import Button from './Component/Button'

const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const handleGoodFeedback = () => {
    setFeedback({...feedback, good: feedback.good+1})
  }
  const handleNeutralFeeback = () => {
    setFeedback({...feedback, neutral: feedback.neutral+1})
  }
  const handleBadFeedback = () => {
    setFeedback({...feedback, bad: feedback.bad+1})
  }
  
  return (
    <div>
      <h2> Give Feedback </h2>
      
      <Button handler={handleGoodFeedback} text='good'/>
      <Button handler={handleNeutralFeeback} text='neutral'/>
      <Button handler={handleBadFeedback} text='bad'/>
      <h2> Statistics </h2>
      <Statistics feedback={feedback}/>
    </div>
  )
}

export default App
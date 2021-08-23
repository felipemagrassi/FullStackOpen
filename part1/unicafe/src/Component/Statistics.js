import React from "react";
import StatisticLine from './StatisticLine'

const Statistics = ({feedback}) => {
  const all = feedback.good + feedback.neutral + feedback.bad;
  const average = (feedback.good-feedback.bad) / all;
  const positive = 100 * (feedback.good/all);
  
  if (all === 0) {
    return (<p>No feedback yet</p> )    
  }
  else {
    return (
      
      <table>
        <StatisticLine text={'good'} value={feedback.good}/>
        <StatisticLine text={'neutral'} value={feedback.neutral}/>
        <StatisticLine text={'bad'} value={feedback.bad}/>
        <StatisticLine text={'all'} value={all}/>
        <StatisticLine text={'average'} value={average}/>
        <StatisticLine text={'positive (%)'} value={positive}/>
      </table>
    )
  }
}

export default Statistics;
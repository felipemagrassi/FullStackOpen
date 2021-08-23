import React from 'react';

export default function Total({exercises}) {
  const sum = exercises.reduce((a, b) => a + b.exercises, 0);
  
  return (
  <p>Number of exercises {sum}</p>
  )
}
import React from 'react'; 
import Part from './Part'

export default function Content( {data} ) {

  return (
    <div>
    {data.map((data) => (
    
    <Part 
    part={data.name} 
    exercises={data.exercises}/> 
    
    ))}
    </div>
  )
}
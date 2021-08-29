import React from 'react';
import Header from './Header'
import Content from './Content'
import Total from './Total'

export default function Course( { course }) {

  return (
    <div>
      <Header name={course.name}></Header>
      <Content data={course.parts}/>
      <Total exercises={course.parts} />
    </div>
  )
}
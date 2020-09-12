import React from 'react'

const Header = ({ course }) => {
    return (
      <h1 key={course.name}>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const arr = course.parts.map(p => p.exercises)
    const sum = arr.reduce(function(a, b){
      return a+b;
    }, 0);
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      course.parts.map(p1 =>
        <div key={p1.name}>{< Part part={p1} />}</div>
      )
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Part = (props) => (
  <>
    <p>{props.exercisename} {props.exercisecount}</p>
  </>
)

const Total = (props) => (
  <>
    <p>Number of exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p>
  </>
)

const Content = (props) => (
  <>
    <Part exercisename={props.parts[0].name} exercisecount={props.parts[0].exercises}/>
    <Part exercisename={props.parts[1].name} exercisecount={props.parts[1].exercises}/>
    <Part exercisename={props.parts[2].name} exercisecount={props.parts[2].exercises}/>
  </>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
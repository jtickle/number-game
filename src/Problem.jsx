import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

export function Problem (props) {
  const elementRef = useRef()

  const children = props.children

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView()
    }
  })

  return (
    <>
      <Row ref={elementRef}>
        {children}
      </Row>
      <hr />
    </>
  )
}

export function Instruction ({ children }) {
  return (
    <Col className='text-end pt-2'>
      {children}
    </Col>
  )
}

export function Question ({ children }) {
  return (
    <Col xs={3}>
      {children}
    </Col>
  )
}

export function Answer ({ correct, children }) {
  const correctClass = correct ? 'text-success' : 'text-danger'
  const show = correct ? 'Correct!' : children
  return (
    <Col xs={3} className={'pt-2 ' + correctClass}>
      {show}
    </Col>
  )
}

export function Br () {
  return (
    <br className='d-sm-none' />
  )
}

export function Val ({ children }) {
  return (
    <strong style={{ whiteSpace: 'nowrap' }}>{children}</strong>
  )
}

export function Response ({ answered, answer, submitAnswer }) {
  const [currentAnswer, setCurrentAnswer] = useState('')

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

  function handleChange (event) {
    setCurrentAnswer(event.target.value)
  }

  function handleKeyDown (event) {
    if (event.key === 'Enter') {
      submitAnswer(currentAnswer)
    }
  }

  const commonProps = {
    className: 'text-end',
    type: 'text'
  }

  if (answered) {
    return (
      <Form.Control {...commonProps} value={answer} disabled />
    )
  } else {
    return (
      <Form.Control ref={inputRef} {...commonProps} onChange={handleChange} onKeyDown={handleKeyDown} value={currentAnswer} />
    )
  }
}

Problem.Instruction = Instruction
Problem.Question = Question
Problem.Answer = Answer
Problem.Br = Br
Problem.Val = Val
Problem.Response = Response

Problem.propTypes = {
  question: PropTypes.object.isRequired,
  submitAnswer: PropTypes.func
}

export default Problem

import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

function Problem (props) {
  const { question, submitAnswer } = props
  const [currentAnswer, setCurrentAnswer] = useState('')

  const elementRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView()
    }
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

  function correctClass () {
    return question.isCorrect()
      ? 'text-success'
      : 'text-danger'
  }

  return (
    <>
      <Row ref={elementRef}>
        <Col className='text-end pt-2'>
          {question.instruction()}
        </Col>
        <Col xs={3}>
          {typeof (question.answer) === 'undefined' ? <Form.Control ref={inputRef} className='text-end' type='text' onChange={handleChange} onKeyDown={handleKeyDown} value={currentAnswer} /> : ''}
          {typeof (question.answer) !== 'undefined' ? <Form.Control className='text-end ' type='text' value={question.answer} disabled /> : ''}
        </Col>
        <Col xs={3} className={'pt-2 ' + correctClass()}>
          {typeof (question.answer) !== 'undefined'
            ? question.isCorrect()
              ? 'Correct! '
              : question.showAnswer()
            : ''}
        </Col>
      </Row>
      <hr />
    </>
  )
}

Problem.propTypes = {
  question: PropTypes.object.isRequired,
  submitAnswer: PropTypes.func
}

export default Problem

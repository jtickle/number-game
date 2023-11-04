import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import baseutil from './baseutil'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

function Problem (props) {
  const { from, to, value, answer, submitAnswer } = props

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

  function isCorrect () {
    if (!answer) return false
    const parsed = parseInt(answer.replace(/ +/g, ''), to)
    return parsed === value
  }

  function correctClass () {
    return isCorrect()
      ? 'text-success'
      : 'text-danger'
  }

  return (
    <>
      <Row ref={elementRef}>
        <Col className='text-end pt-2'>
          Convert <strong style={{ whiteSpace: 'nowrap' }}>{baseutil.formatValue(from, value)}</strong><br className='d-sm-none' /> to <strong>{baseutil.localize(to)}</strong>
        </Col>
        <Col xs={3}>
          {typeof (answer) === 'undefined' ? <Form.Control ref={inputRef} className='text-end' type='text' onChange={handleChange} onKeyDown={handleKeyDown} value={currentAnswer} /> : ''}
          {typeof (answer) !== 'undefined' ? <Form.Control className='text-end ' type='text' value={answer} disabled /> : ''}
        </Col>
        <Col xs={3} className={'pt-2 ' + correctClass()}>
          {typeof (answer) !== 'undefined'
            ? isCorrect()
              ? 'Correct! '
              : baseutil.formatValue(to, value)
            : ''}
        </Col>
      </Row>
      <hr />
    </>
  )
}

Problem.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  answer: PropTypes.string,
  submitAnswer: PropTypes.func
}

export default Problem

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function binSpacing(binstr) {
  let acc = ""
  for(let ch in binstr) {
    acc += binstr[ch];
    if(ch % 4 == 3) {
      acc += " ";
    }
  }
  return acc.trim();
}

function Problem(props) {
  const {from, to, value, answer, submitAnswer} = props

  const [currentAnswer, setCurrentAnswer] = useState("")

  const elementRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => { 
    if(elementRef.current) {
      elementRef.current.scrollIntoView()
    }
    if(inputRef.current) {
      inputRef.current.focus()
    }
  });

  function as_bin(n) {
    const bin = n.toString(2);
    const mod = bin.length % 4;
    if (mod == 0) {
      return binSpacing(bin);
    } else {
      return binSpacing("0".repeat(4 - mod) + bin);
    }
  }

  function as_dec(n) {
    return n.toString(10);
  }

  function as_hex(n) {
    return "0x" + n.toString(16).toUpperCase();
  }
  function as_generic(base, n) {
    return n.toString(base)
  }

  function formatValue(base, value) {
    switch(base) {
      case 2:
        return as_bin(value)
      case 16:
        return as_hex(value)
      case 10:
        return as_dec(value)
      default:
        return as_generic(base, value)
    }
  }

  function localize(base) {
    switch(base) {
      case 2:
        return "Binary";
      case 16:
        return "Hexadecimal";
      case 10:
        return "Decimal";
      default:
        return "Base " + base;
    }
  }

  function handleChange(event) {
    setCurrentAnswer(event.target.value)
  }

  function handleKeyDown(event) {
    if(event.key === 'Enter') {
      submitAnswer(currentAnswer)
    }
  }

  function isCorrect() {
    if(!answer) return false;
    const parsed = parseInt(answer.replace(/ +/g, ''), to)
    return parsed == value
  }

  function correctClass() {
    return isCorrect()
      ? "text-success"
      : "text-danger"
  }

  return (
    <>
      <Row ref={elementRef}>
        <Col className="text-end pt-2">
          Convert <strong>{formatValue(from, value)}</strong> to <strong>{localize(to)}</strong>
        </Col>
        <Col>
          {typeof(answer) === 'undefined' ? <Form.Control ref={inputRef} className="text-end" type="text" onChange={handleChange} onKeyDown={handleKeyDown} value={currentAnswer}/> : ""}
          {typeof(answer) !== 'undefined' ? <Form.Control className="text-end " type="text" value={answer} disabled/> : ""}
        </Col>
        <Col className={"pt-2 " + correctClass()}>
          {typeof(answer) !== 'undefined'
            ? isCorrect()
              ? "Correct! "
              : formatValue(to, value)
            : ""}
        </Col>
      </Row>
      <hr />
    </>
  );
}

Problem.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  answer: PropTypes.string,
  submitAnswer: PropTypes.func,
}

export default Problem;
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

  function formatValue(as, value) {
    switch(as) {
      case "bin":
        return as_bin(value)
      case "hex":
        return as_hex(value)
      case "dec":
        return as_dec(value)
      default:
        console.error("Unsupported from format: " + from);
    }
  }

  function localize(base) {
    switch(base) {
      case "bin":
        return "Binary";
      case "hex":
        return "Hexadecimal";
      case "dec":
        return "Decimal";
      default:
        console.error("Unsupported base: " + base);
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

  return (
    <>
      <Row ref={elementRef}>
        <Col xs={6} className="text-end pt-2">
          Convert <strong>{formatValue(from, value)}</strong> to <strong>{localize(to)}</strong>
        </Col>
        <Col>
          {typeof(answer) === 'undefined' ? <Form.Control ref={inputRef} className="text-end" type="text" onChange={handleChange} onKeyDown={handleKeyDown} value={currentAnswer}/> : ""}
          {typeof(answer) !== 'undefined' ? <Form.Control className="text-end" type="text" value={answer} disabled/> : ""}
        </Col>
        <Col>
          {typeof(answer) !== 'undefined'
            ? <p>Correct Answer: {formatValue(to, value)}</p>
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
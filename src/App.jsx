import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Problem from './Problem';
import SettingChange from './SettingChange';
import { Form } from 'react-bootstrap';

function randSel(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function App() {
  const [prefs, setPrefs] = useState({
    bits: 8,
    convertFrom: ['hex', 'bin', 'dec'],
    convertTo: ['hex', 'bin', 'dec'],
  })
  const [questions, setQuestions] = useState([])

  function makeNextQuestion() {
    const newQuestions = [...questions]

    const from = randSel(prefs.convertFrom)
    const to = randSel(prefs.convertTo.filter((x) => x != from))
    const value = Math.floor(Math.random() * Math.pow(2, prefs.bits))

    newQuestions.push({from, to, value})
    setQuestions(newQuestions)
  }

  function submitAnswer(answer) {
    const newQuestions = [...questions]

    newQuestions[questions.length - 1].answer = answer
    setQuestions(newQuestions)
    
    makeNextQuestion()
  }

  function updateBits(bits) {
    const newPrefs = {...prefs}

    newPrefs.bits = parseInt(bits)

    setPrefs(newPrefs)
  }

  console.log(prefs, questions);

  return (
    <Container className="mt-3">
      <Row>
        <Col xs={9}>
          <Container>
            <>
              {questions.map((question, i) =>
                typeof(question.answer) == 'undefined'
                  ? <Problem key={i} {...question} submitAnswer={submitAnswer} />
                  : <Problem key={i} {...question} />
              )}
            </>
            {questions.length == 0 ? <Button onClick={makeNextQuestion}>Start!!</Button> : ""}
          </Container>
        </Col>
        <Col>
          <Form className="position-fixed">
            <Form.Group>
              <Form.Label>Number of Bits</Form.Label>
              <SettingChange value={prefs.bits} onChange={updateBits} />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

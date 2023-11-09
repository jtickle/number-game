import { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MainNav from './MainNav'

import Problem from './Problem'
import Settings from './Settings'

import QuestionManager from './Questions/QuestionManager'

function App () {
  const [prefs, setPrefs] = useState(QuestionManager.getDefaultPrefs())
  const [questions, setQuestions] = useState([])
  const [showSettings, setShowSettings] = useState(false)

  function makeNextQuestion () {
    setQuestions((questions) =>
      [...questions, QuestionManager.makeQuestion(prefs)])
  }

  function submitAnswer (answer) {
    setQuestions((questions) => {
      const newQuestions = [...questions]
      newQuestions[questions.length - 1].answer = answer
      return newQuestions
    })
    makeNextQuestion()
  }

  function newGame () {
    setQuestions(() => [])
    makeNextQuestion()
  }

  console.log(prefs, questions)

  const correctVals = questions.reduce((acc, q) => {
    let [of, total] = acc
    total += 1
    if (q.answer && parseInt(q.answer.replace(/ +/g, ''), q.to) === q.value) {
      of += 1
    }
    return [of, total]
  }, [0, 0])
  const correct = `${correctVals[0]}/${correctVals[1] - 1}`
  console.log(correct)

  return (
    <>
      <Container className='mt-3'>
        <Row>
          <Col xs={12}>
            <Container>
              {questions.map((question, i) =>
                typeof (question.answer) === 'undefined'
                  ? <Problem key={i} question={question} submitAnswer={submitAnswer} />
                  : <Problem key={i} question={question} />
              )}
              <div className='mb-5 pb-5' />
            </Container>
          </Col>
        </Row>
      </Container>
      <MainNav newGame={newGame} correct={correct} showSettings={() => setShowSettings(true)} />
      <Settings prefs={prefs} setPrefs={setPrefs} show={showSettings} onHide={() => setShowSettings(false)} />
    </>
  )
}

export default App

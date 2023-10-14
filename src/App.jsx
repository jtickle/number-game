import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainNav from './MainNav';

import Problem from './Problem';
import Settings from './Settings';

function randSel(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function App() {
  const [prefs, setPrefs] = useState({
    bits: 8,
    convertFrom: [2, 10, 16],
    convertTo: [2, 10, 16],
  })
  const [questions, setQuestions] = useState([])
  const [showSettings, setShowSettings] = useState(false)

  function makeNextQuestion() {
    const from = randSel(prefs.convertFrom)
    const to = randSel(prefs.convertTo.filter((x) => x != from))
    const value = Math.floor(Math.random() * Math.pow(2, prefs.bits))

    setQuestions((questions) => [...questions, {from, to, value}])
  }

  function submitAnswer(answer) {
    setQuestions((questions) => { 
      const newQuestions = [...questions]
      newQuestions[questions.length - 1].answer = answer
      return newQuestions
    })
    makeNextQuestion()
  }

  function newGame() {
    setQuestions(() => [])
    makeNextQuestion()
  }

  console.log(prefs, questions);

  const correctVals = questions.reduce((acc, q) => {
    var [of, total] = acc
    total += 1
    if(q.answer && parseInt(q.answer.replace(/ +/g, ''), q.to) === q.value) {
      of += 1
    }
    return [of, total]
  }, [0,0])
  const correct=`${correctVals[0]}/${correctVals[1]-1}`
  console.log(correct)

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col xs={12}>
            <Container>
              {questions.map((question, i) =>
                typeof(question.answer) == 'undefined'
                  ? <Problem key={i} {...question} submitAnswer={submitAnswer} />
                  : <Problem key={i} {...question} />
              )}
              <div className="mb-5 pb-5"></div>
            </Container>
          </Col>
        </Row>
      </Container>
      <MainNav newGame={newGame} correct={correct} showSettings={() => setShowSettings(true)} />
      <Settings prefs={prefs} setPrefs={setPrefs} show={showSettings} onHide={() => setShowSettings(false)} />
    </>
  );
}

export default App;

import React from 'react'
import Conversion from './Conversion'
import sample from 'lodash/sample'

export const questionTypes = [
  Conversion
]

export function makeQuestion (prefs) {
  // Pick a random question type from enabled question types
  const questionType = sample(questionTypes.filter((qt) => prefs[qt.typeName].enabled))
  const question = questionType.makeQuestion(prefs)
  question.isCorrect = questionType.isCorrect.bind(question)
  question.instruction = questionType.instruction.bind(question)
  question.showAnswer = questionType.showAnswer.bind(question)
  return question
}

export function getDefaultPrefs () {
  return questionTypes.reduce((obj, item) => {
    obj[item.typeName] = item.getDefaultPrefs()
    return obj
  }, {})
}

export function showSettings (prefs, setPrefs) {
  return questionTypes.map((qt) => (
    <React.Fragment key={qt.typeName}>
      {qt.showSettings(prefs[qt.typeName], setPrefs[qt.typeName])}
    </React.Fragment>
  ))
}

export default {
  questionTypes,
  makeQuestion,
  getDefaultPrefs,
  showSettings
}

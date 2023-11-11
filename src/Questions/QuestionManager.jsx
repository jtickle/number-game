import React from 'react'
import Conversion from './Conversion'
import sample from 'lodash/sample'

export const questionTypes = [
  Conversion
]

function isAnswered () {
  return typeof (this.answer) !== 'undefined'
}

export function makeQuestion (prefs) {
  // Pick a random question type from enabled question types
  const questionType = sample(questionTypes.filter((qt) => prefs[qt.typeName].enabled))
  const question = questionType.makeQuestion(prefs)
  question.View = questionType.View.bind(question)
  question.isCorrect = questionType.isCorrect.bind(question)
  question.isAnswered = isAnswered.bind(question)
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

import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

import sample from 'lodash/sample'
import baseutil from '../baseutil'
import ChooseBases from '../ChooseBases'
import Prob from '../Problem'

export const typeName = 'conversion'

export function makeQuestion (prefs) {
  // Select a random base to convert from
  const from = sample(prefs[typeName].bases)
  // Select a random base to convert to, excluding the "from" base
  const to = sample(prefs[typeName].bases.filter((x) => x !== from))
  // Generate a random value based on the bits setting
  const value = Math.floor(Math.random() * Math.pow(2, prefs[typeName].bits))

  return { questionType: typeName, from, to, value }
}

export function getDefaultPrefs () {
  return {
    enabled: true,
    bits: 8,
    bases: [2, 10, 16]
  }
}

export function isCorrect () {
  if (typeof (this.answer) === 'undefined') return false
  // Remove string spaces from response (for binaries) and
  // convert to Integer in the requested base
  const parsed = parseInt(this.answer.replace(/ +/g, ''), this.to)
  return parsed === this.value
}

export function View (props) {
  const fromVal = (<Prob.Val>{baseutil.formatValue(this.from, this.value)}</Prob.Val>)
  const toVal = (<Prob.Val>{baseutil.localize(this.to)}</Prob.Val>)
  const answer = this.isAnswered() ? baseutil.formatValue(this.to, this.value) : ''

  // TODO: useRef to focus the Response input
  // or maybe the response input is responsible for that?
  // if (inputRef.current) {
  //   inputRef.current.focus()
  // }

  return (
    <Prob>
      <Prob.Instruction>
        Convert {fromVal}<Prob.Br /> to {toVal}
      </Prob.Instruction>
      <Prob.Question>
        <Prob.Response answered={this.isAnswered()} submitAnswer={props.submitAnswer} />
      </Prob.Question>
      <Prob.Answer correct={this.isCorrect()}>
        {answer}
      </Prob.Answer>
    </Prob>
  )
}

View.propTypes = {
  submitAnswer: PropTypes.func
}

export function showSettings (prefs, setPrefs) {
  return (
    <>
      <strong><Form.Check type='checkbox' id={`${typeName}-enabled`} label='Base Conversion' checked={prefs.enabled} onChange={() => setPrefs({ ...prefs, enabled: !prefs.enabled })} /></strong>
      <Form.Group>
        <Form.Label>Number of Bits</Form.Label>
        <Form.Control className='text-end' value={prefs.bits} onChange={(e) => setPrefs({ ...prefs, bits: e.target.value })} />
      </Form.Group>
      <Form.Group>
        Conversions
        <ChooseBases bases={prefs.bases} setBases={(bases) => setPrefs({ ...prefs, bases })} />
        <small>If you want a base that isn&apos;t listed, just enter the radix in decimal. Due to Javascript limitations, this game is limited to base 36. Special base64 support coming soon!!</small>
      </Form.Group>
    </>
  )
}

export default {
  typeName,
  makeQuestion,
  getDefaultPrefs,
  isCorrect,
  View,
  showSettings
}

import PropTypes from 'prop-types'
import { useState } from 'react'

import cloneDeep from 'lodash/cloneDeep'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import QuestionManager from './Questions/QuestionManager'

function Settings (props) {
  const newPrefs = {}
  const setNewPrefs = {}
  for (const key of Object.keys(props.prefs)) {
    [newPrefs[key], setNewPrefs[key]] = useState(cloneDeep(props.prefs[key]))
  }

  function save (e) {
    if (typeof (e) !== 'undefined') {
      e.preventDefault()
    }
    props.setPrefs(newPrefs)
    props.onHide()
  }

  function close (e) {
    if (typeof (e) !== 'undefined') {
      e.preventDefault()
    }
    props.onHide()
  }

  function prefsValid () {
    return Object.keys(newPrefs).some((k) => newPrefs[k].enabled)
  }

  return (
    <Modal show={props.show} onHide={close} centered aria-labelledby='settings-label'>
      <Modal.Header closeButton>
        <Modal.Title id='settings-label'>
          Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={save}>
          {QuestionManager.showSettings(newPrefs, setNewPrefs)}
        </Form>
        <small>Setting changes won't take effect until your next question.</small>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={close}>Close</Button>
        <Button variant='primary' onClick={save} disabled={!prefsValid()}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

Settings.propTypes = {
  prefs: PropTypes.object,
  setPrefs: PropTypes.func,
  show: PropTypes.bool,
  onHide: PropTypes.func
}

export default Settings

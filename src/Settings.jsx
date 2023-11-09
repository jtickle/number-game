import PropTypes from 'prop-types'
import { useRef, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import ChooseBases from './ChooseBases'

function Settings (props) {
  const bits = useRef(null)

  const [conversionsState, setConversionsState] = useState(props.prefs.conversions)

  function save (e) {
    if (typeof (e) !== 'undefined') {
      e.preventDefault()
    }
    props.setPrefs(() => ({
      bits: parseInt(bits.current.value),
      conversions: conversionsState
    }))
    props.onHide()
  }

  function close (e) {
    if (typeof (e) !== 'undefined') {
      e.preventDefault()
    }
    props.onHide()
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
          <Form.Group>
            <Form.Label>Number of Bits</Form.Label>
            <Form.Control ref={bits} className='text-end' defaultValue={props.prefs.bits} />
          </Form.Group>
          <Form.Group>
            Conversions
            <ChooseBases bases={conversionsState} setBases={setConversionsState} onChange={setConversionsState} />
            <small>If you want a base that isn&apos;t listed, just enter the radix in decimal. Due to Javascript limitations, this game is limited to base 36. Special base64 support coming soon!!</small>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={close}>Close</Button>
        <Button variant='primary' onClick={save}>Save</Button>
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

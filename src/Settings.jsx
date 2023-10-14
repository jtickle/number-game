import PropTypes from 'prop-types'
import { useRef } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

function Settings(props) {
  const bits = useRef(null)

  function save(e) {
    if(typeof(e) !== "undefined") {
      e.preventDefault()
    }
    props.setPrefs(() => ({
      ...props.prefs,
      bits: parseInt(bits.current.value),
    }))
    props.onHide()
  }

  function close(e) {
    if(typeof(e) !== "undefined") {
      e.preventDefault()
    }
    props.onHide()
  }

  return (
    <Modal show={props.show} onHide={close} centered aria-labelledby="settings-label">
      <Modal.Header closeButton>
        <Modal.Title id="settings-label">
          Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={save}>
          <Form.Group>
            <Form.Label>Number of Bits</Form.Label>
            <Form.Control ref={bits} className="text-end" defaultValue={props.prefs.bits} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close}>Close</Button>
        <Button variant="primary" onClick={save}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

Settings.propTypes = {
  prefs: PropTypes.object,
  setPrefs: PropTypes.func,
  show: PropTypes.bool,
  onHide: PropTypes.func,
}

export default Settings;
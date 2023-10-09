import { useState, useRef } from 'react';
import { PropTypes } from 'prop-types';

import Form from 'react-bootstrap/Form';

function SettingChange(props) {
  const [newVal, setNewVal] = useState(props.value)
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)

  function blur() {
    if(inputRef.current) {
      inputRef.current.blur()
    }
  }

  function handleChange(event) {
    setNewVal(event.target.value)
  }

  function handleFocus(event) {
    setEditing(true)
    if(inputRef.current) {
      inputRef.current.select()
    }
  }

  function cancelChange() {
    setNewVal(props.value)
    setEditing(false)
    blur()
  }

  function saveChange() {
    props.onChange(newVal)
    setEditing(false)
  }

  function handleKeyDown(event) {
    if(event.key === 'Enter') {
      saveChange()
    } else if(event.key === 'Escape') {
      cancelChange()
    }
  }

  return (
    <>
      <Form.Control ref={inputRef} className="text-end" type="text" value={newVal} onFocus={handleFocus} onBlur={cancelChange} onChange={handleChange} onKeyDown={handleKeyDown} />
      <Form.Text>{editing ? "Enter saves, Esc cancels" : " "}</Form.Text>
    </>
  )
}

SettingChange.propTypes = {
  value: PropTypes.string.is_required,
  onChange: PropTypes.func.is_required,
}

export default SettingChange;
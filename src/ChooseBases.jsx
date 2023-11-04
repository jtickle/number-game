import PropTypes from 'prop-types'
import CreatableSelect from 'react-select/creatable'
import baseutil from './baseutil'

function ChooseBases (props) {
  const value = props.bases.map((val) => {
    return {
      label: baseutil.localize(val),
      value: val
    }
  })

  function handleChange (newValue) {
    props.setBases(
      newValue.map((val) => parseInt(val.value))
        .sort((a, b) => a - b)
        .filter((val) => !isNaN(val) && val > 1 && val <= 36))
  }

  return (
    <CreatableSelect
      isMulti
      onChange={handleChange}
      options={baseutil.baseChoices}
      value={value}
    />
  )
}

ChooseBases.propTypes = {
  bases: PropTypes.arrayOf(PropTypes.number),
  setBases: PropTypes.func
}

export default ChooseBases

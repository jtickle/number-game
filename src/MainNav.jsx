import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

function MainNav(props) {
  return (  
    <>
      <Navbar className="navbar-light bg-light fixed-bottom">
        <Container>
          <Navbar.Brand>Numbers</Navbar.Brand>
          <Button variant="primary" onClick={props.newGame}>New Game</Button>
          <span>{props.correct} Correct</span>
          <Button variant="secondary"onClick={props.showSettings}>Settings</Button>
        </Container>
      </Navbar>
    </>
  )
}

MainNav.propTypes = {
  newGame: PropTypes.func.isRequired,
  showSettings: PropTypes.func.isRequired,
  correct: PropTypes.string.isRequired,
}

export default MainNav;
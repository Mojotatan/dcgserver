import React from 'react'
import {connect} from 'react-redux'

import {logout} from '../store/user-reducer'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({
      user: '',
      pw: ''
    })

    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login(e) {
    e.preventDefault()
    this.props.socket.emit('login', this.state)
    this.setState({
      user: '',
      pw: ''
    })
  }

  logout(e) {
    this.props.socket.emit('logout')
    this.props.logout()
  }

  // componentWillReceiveProps(props) {
  //   console.log(props)
  // }

  // componentWillMount() {
  //   console.log(this.props)
  // }

  render() {
    return (!this.props.user) ? (
      <div>
        <form onSubmit={this.login}>
          <input
            onChange={this.handleChange}
            name="user"
            value={this.state.user}
          />
          <input
            onChange={this.handleChange}
            name="pw"
            type="password"
            value={this.state.pw}
          />
          <button>
            Submit
          </button>
        </form>
      </div>
    )
    :
    (
      <button onClick={this.logout}>Logout</button>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
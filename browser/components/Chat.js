import React from 'react'
import {connect} from 'react-redux'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({
      message: ''
    })

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.socket.emit('chat', {message: this.state.message, channel: this.props.channel})
    this.setState({
      message: ''
    })
  }

  render() {
    return (this.props.user) ? (
      <div className="chat">
        {this.props.chatLog.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            name="message"
            value={this.state.message}
          />
        </form>
        <button onClick={() => {this.props.socket.emit('new_game')}}>newgame</button>
      </div>
    )
    :
    null
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  chatLog: state.chat.chatLog,
  channel: state.chat.channel
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
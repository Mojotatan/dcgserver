import React from 'react'
import {connect} from 'react-redux'

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({})
  }

  render() {
    return (
      <div>
        <div>Dem games man</div>
        {this.props.games.map((game, index) => (
          <div key={index}>{game}</div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  games: state.games.games
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
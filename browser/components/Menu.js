import React from 'react'
import {connect} from 'react-redux'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({})
  }

  render() {
    return (
      <div>Durrrr</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
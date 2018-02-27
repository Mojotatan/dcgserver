function Game(player1, player2) {
  this.player1 = new Player(player1.name, player1.deck)
  this.player2 = new Player(player2.name, player2.deck)

  this.priority = (Math.floor(Math.random() * 2) === 0) ? this.player1 : this.player2

  //meh
  this.turns = []
  this.getTurn = () => (this.turns[this.turns.length - 1])

  this.activePlayer = player

  const gameSequence = ['upkeep', 'main', 'combat', 'main', 'eot']
  this.phase = 0
  this.getPhase = () => (gameSequence[this.phase])
  this.advancePhase = () => {
    phase++

  }

  this.triggers = []
  this.setTrigger = (time, effect) => {
    this.triggers.push(new Trigger(time, effect))
  }
  this.handleTriggers = (time) => {
    let firing = []
    this.triggers = this.triggers.filter(trigger => {
      if (trigger.time === time) {
        firing.push(trigger)
        return false
      }
      else return true
    })
    firing.forEach(trigger => {
      trigger.effect()
    })
  }
}

// can add profile shit like avatars later
function Player(name, deck) {
  this.name = name
  this.deck = deck
  this.life = 20 // set up initial game state yadda yadda yadda
}

function Trigger(time, effect) { // effect should be a function
  this.time = time
  this.effect = effect
}

function Card() {}
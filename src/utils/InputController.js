import eventBus from './EventBus'
import keyListener from './KeyListener'

class InputController {
  setPlayer(player) {
    this.player = player
    this.player.x = 0
    this.player.y = 0
    this.isJumping = false
  }

  run() {
    this.player.x = 0
    this.player.y = 0

    if (this.isJumping) {
      return
    }

    if (keyListener.isPressed('KeyA')) {
      this.player.x--
    }

    if (keyListener.isPressed('KeyD')) {
      this.player.x++
    }

    if (keyListener.isPressed('KeyW')) {
      this.player.y++
    }

    if (keyListener.isPressed('KeyS')) {
      this.player.y--
    }
  }

  jumping(flag) {
    this.isJumping = flag
  }

  dispatchKeys(data) {
    this.player.eventBus.dispatch('keyListener', data)
  }

  start() {
    this.player.eventBus.subscribe('jumping', this.jumping.bind(this))
    eventBus.subscribe('keyListener', this.dispatchKeys.bind(this))
  }

  stop() {
    this.player.eventBus.unsubscribe('jumping', this.jumping.bind(this))
    eventBus.unsubscribe('keyListener', this.dispatchKeys.bind(this))
  }
}

export default InputController

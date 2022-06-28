import { Clock, Vector2 } from 'three'
import eventBus from './EventBus'

class DisplacementController {
  setPlayer(player) {
    this.player = player
    this.v2 = new Vector2()
    this.speedReference = 1.5
    this.speed = this.speedReference
    this.clock = new Clock()
    this.timer = new Date().getTime()
    this.isJumping = false
  }

  run() {
    const delta = this.clock.getDelta()
    this.resetTimer()

    if (this.isJumping || this.timer + 200 > new Date().getTime()) {
      return
    }

    this.v2.set(
      Math.sin(this.player.mesh.rotation.y),
      Math.cos(this.player.mesh.rotation.y)
    )

    this.player.mesh.position.x += this.v2.x * this.speed * delta
    this.player.mesh.position.z += this.v2.y * this.speed * delta
  }

  resetTimer() {
    if ((this.player.x === 0 && this.player.y === 0) || this.isJumping) {
      this.timer = new Date().getTime()
    }
  }

  keyListener(data) {
    if (data[0] === 'ShiftLeft') {
      this.speed = data[1] ? this.speedReference * 2 : this.speedReference
    }
  }

  jumping(flag) {
    this.isJumping = flag
  }

  start() {
    eventBus.subscribe('keyListener', this.keyListener.bind(this))
  }

  stop() {
    eventBus.unsubscribe('keyListener', this.keyListener.bind(this))
  }
}

export default DisplacementController

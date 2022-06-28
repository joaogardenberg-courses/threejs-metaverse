import eventBus from './EventBus'
import keyListener from './KeyListener'
import AnimatorModeAdapter from './AnimatorModeAdapter'

class AnimationController {
  setPlayer(player) {
    this.player = player

    this.animatorAdapter = new AnimatorModeAdapter(
      this.player.mesh,
      this.player.mesh.modes
    )

    this.isJumping = false
  }

  run() {
    if (!this.animatorAdapter.animator.inProgress && this.isJumping) {
      this.isJumping = false
      this.jumping(this.isJumping)
    }

    if (keyListener.isPressed('Space') && !this.isJumping) {
      this.animatorAdapter.setMode('walk')
      this.animatorAdapter.run('jump')
      this.isJumping = true
      this.jumping(this.isJumping)
    } else {
      if (this.player.x !== 0 || this.player.y !== 0) {
        this.animatorAdapter.run('ahead')
      } else {
        this.animatorAdapter.run('idle')
      }
    }
  }

  jumping(flag) {
    this.player.eventBus.dispatch('jumping', flag)
  }

  keyListener(data) {
    if (data[0] === 'ShiftLeft') {
      this.animatorAdapter.setMode(data[1] ? 'run' : 'walk')
    }
  }

  start() {
    this.animatorAdapter.start()
    eventBus.subscribe('keyListener', this.keyListener.bind(this))
  }

  stop() {
    this.animatorAdapter.stop()
    eventBus.unsubscribe('keyListener', this.keyListener.bind(this))
  }
}

export default AnimationController

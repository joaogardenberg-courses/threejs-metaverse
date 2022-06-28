import Animator from './Animator'

class AnimatorModeAdapter {
  constructor(mesh, modes) {
    this.modes = modes
    this.mode = 'walk'
    this.animator = new Animator(mesh)
  }

  setMode(mode) {
    this.mode = mode
  }

  run(animationName) {
    if (!this.modes[this.mode]?.[animationName]) {
      return
    }

    const animationId = this.modes[this.mode][animationName][0]
    const timeScale = this.modes[this.mode][animationName][1]
    const cycleFlag = this.modes[this.mode][animationName][2]
    this.animator.action(animationId, timeScale, cycleFlag)
  }

  start() {
    this.animator.start()
  }

  stop() {
    this.animator.stop()
  }
}

export default AnimatorModeAdapter

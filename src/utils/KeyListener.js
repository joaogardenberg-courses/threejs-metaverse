class KeyListener {
  constructor(caster) {
    this.keys = {}
    this.caster = caster || console.log
  }

  setCaster(caster) {
    this.caster = caster
  }

  isPressed(code) {
    return Boolean(this.keys[code])
  }

  down(e) {
    if (this.keys[e.code]) {
      return
    }

    this.keys[e.code] = true
    this.caster([e.code, true, this.keys])
  }

  up(e) {
    if (!this.keys[e.code]) {
      return
    }

    this.keys[e.code] = false
    this.caster([e.code, false, this.keys])
  }

  start() {
    window.addEventListener('keydown', this.down.bind(this))
    window.addEventListener('keyup', this.up.bind(this))
  }

  stop() {
    window.removeEventListener('keydown', this.down.bind(this))
    window.removeEventListener('keyup', this.up.bind(this))
  }
}

const keyListener = new KeyListener()

export default keyListener

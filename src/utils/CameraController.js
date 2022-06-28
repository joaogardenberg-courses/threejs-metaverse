import { Vector3 } from 'three'
import camera from '../three/Camera'

class CameraController {
  setPlayer(player) {
    this.player = player
    this.player.camera = this
    this.target = new Vector3()

    this.types = {
      battle: this.battle.bind(this),
      dialog: this.dialog.bind(this)
    }

    this.type = this.types.battle
    this.flag = false
  }

  switcher(data) {
    if (data[0] === 'KeyQ' && data[1]) {
      this.flag = !this.flag
      this.type = this.flag ? this.types.dialog : this.types.battle
    }
  }

  run() {
    this.type()
  }

  battle() {
    camera.position.x = this.player.mesh.position.x - 5
    camera.position.y = this.player.mesh.position.y + 5
    camera.position.z = this.player.mesh.position.z - 5

    this.target.set(
      this.player.mesh.position.x,
      this.player.mesh.position.y + 1,
      this.player.mesh.position.z
    )

    camera.lookAt(this.target)
  }

  dialog() {
    camera.position.x = this.player.mesh.position.x - 1
    camera.position.y = this.player.mesh.position.y + 1.8
    camera.position.z = this.player.mesh.position.z - 1.5

    this.target.set(
      this.player.mesh.position.x - 1,
      this.player.mesh.position.y + 1.5,
      this.player.mesh.position.z
    )

    camera.lookAt(this.target)
  }

  start() {
    this.player.eventBus.subscribe('keyListener', this.switcher.bind(this))
  }

  stop() {
    this.player.eventBus.unsubscribe('keyListener', this.switcher.bind(this))
  }
}

export default CameraController

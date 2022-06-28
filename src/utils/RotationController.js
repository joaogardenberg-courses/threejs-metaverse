import { MathUtils, Vector2 } from 'three'

class RotationController {
  setPlayer(player) {
    this.player = player
    this.player.rotation = this
    this.rotation = { x: 0, y: 0 }
    this.v2 = new Vector2()
    this.interpolation = 0.1
  }

  run() {
    this.rotation.x = MathUtils.lerp(
      this.rotation.x,
      -this.player.x,
      this.interpolation
    )

    this.rotation.y = MathUtils.lerp(
      this.rotation.y,
      this.player.y,
      this.interpolation
    )

    this.player.mesh.rotation.y =
      this.v2.set(this.rotation.y, this.rotation.x).angle() + Math.PI / 4
  }
}

export default RotationController

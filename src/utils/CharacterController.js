import machine from '../three/LoopMachine'
import CameraController from './CameraController'
import DisplacementController from './DisplacementController'
import InputController from './InputController'
import AnimationController from './AnimationController'
import RotationController from './RotationController'
import CollisionController from './CollisionController'
import { EventBus } from './EventBus'

class CharacterController {
  constructor(mesh) {
    this.mesh = mesh
    this.components = []
    this.flag = false
    this.eventBus = new EventBus()
    this.components.push(new InputController())
    this.components.push(new AnimationController())
    this.components.push(new DisplacementController())
    this.components.push(new RotationController())
    this.components.push(new CameraController())
    this.components.push(new CollisionController())
  }

  run() {
    if (!this.flag) {
      return
    }

    this.components.forEach((component) => component.run())
  }

  start() {
    if (this.flag) {
      return
    }

    this.flag = true
    this.components.forEach((component) => component.setPlayer(this))
    this.components.forEach((component) => component.start?.())
    machine.addCallback(this.run.bind(this))
  }

  stop() {
    this.flag = false
    machine.removeCallback(this.run.bind(this))
    this.components.forEach((component) => component.stop?.())
  }
}

export default CharacterController

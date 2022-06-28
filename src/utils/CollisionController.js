import { Box3, Box3Helper, Vector3 } from 'three'
import scene from '../three/Scene'

class CollisionController {
  setPlayer(player) {
    this.player = player
    this.player.onTriggerEnter = this.onTriggerEnter.bind(this)
    this.player.onTriggerExit = this.onTriggerExit.bind(this)
    this.player.collisionWith = this.addObject.bind(this)
    this.player.collisionWithUndo = this.removeObject.bind(this)
    this.position = null
    this.size = new Vector3(0.25, 1.6, 0.25)
    this.objectWrapper = new Box3()
    this.meshWrapper = new Box3()
    this.helper = new Box3Helper(this.meshWrapper, 0xffff00)
    this.flag = false
    this.objectList = {}
    this.timeToCheckIfNear = new Date().getTime()
    this.intervalTime = 2
    this.validateFlag = false
  }

  addObject(obj, radius = 3) {
    this.objectList[obj.uuid] = { obj, status: false, isNear: false, radius }
  }

  removeObject(obj) {
    delete this.objectList[obj.uuid]
  }

  run() {
    this.position = this.player.mesh.position.clone()
    this.position.y += this.flag ? 1.2 : 0.8
    this.meshWrapper.setFromCenterAndSize(this.position, this.size)
    this.validate()
  }

  validate() {
    if (this.timeToCheckIfNear < new Date().getTime()) {
      this.timeToCheckIfNear =
        new Date().getTime() + this.intervalTime * 1000 + Math.random() * 1000
      this.validateFlag = false

      Object.values(this.objectList).forEach((element) => {
        element.isNear =
          element.obj.position.distanceTo(this.player.mesh.position) <
          element.radius

        if (element.isNear) {
          this.validateFlag = true
        }
      })
    }

    if (!this.validateFlag) {
      return
    }

    Object.values(this.objectList).forEach((element) => {
      if (!element.isNear) {
        return
      }

      const obj = element.obj
      this.objectWrapper.setFromObject(obj)
      const collided = this.meshWrapper.intersectsBox(this.objectWrapper)

      if (!this.objectList[obj.uuid].status && collided) {
        this.player.eventBus.dispatch('onTriggerEnter', obj)
      }

      if (this.objectList[obj.uuid].status && !collided) {
        this.player.eventBus.dispatch('onTriggerExit', obj)
      }

      this.objectList[obj.uuid].status = collided
    })
  }

  delay() {
    setTimeout(() => (this.flag = true), 800)
    setTimeout(() => (this.flag = false), 1000)
  }

  jumping(isJumping) {
    if (isJumping) {
      this.delay()
    }
  }

  onTriggerEnter(obj, callback) {
    this.player.eventBus.subscribe(
      'onTriggerEnter',
      (innerObj) => obj === innerObj && callback()
    )
  }

  onTriggerExit(obj, callback) {
    this.player.eventBus.subscribe(
      'onTriggerExit',
      (innerObj) => obj === innerObj && callback()
    )
  }

  start() {
    scene.add(this.helper)
    this.player.eventBus.subscribe('jumping', this.jumping.bind(this))
  }

  stop() {
    scene.remove(this.helper)
  }
}

export default CollisionController

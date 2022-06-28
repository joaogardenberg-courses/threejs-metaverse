import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

class Loader {
  constructor(modelFileUrl, urlAnimationList, scale) {
    this.loader = new FBXLoader()
    this.animationPromises = []
    let animations = []

    const modelPromise = new Promise((resolve) => {
      this.loader.load(modelFileUrl, (object) => {
        object.scale.set(scale, scale, scale)
        object.castShadow = true
        object.receiveShadow = true

        object.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        resolve(object)
      })
    })

    urlAnimationList.forEach((_, index) => {
      this.animationPromises.push(
        new Promise((res) =>
          this.loader.load(urlAnimationList[index], (object) => {
            object.scale.set(scale, scale, scale)
            animations.push(object.animations[0])
            res(index)
          })
        )
      )
    })

    const joinerPromise = Promise.all(this.animationPromises)

    this.model = new Promise((res) =>
      Promise.all([modelPromise, joinerPromise]).then((data) => {
        const object = data[0]

        if (animations.length > 0) {
          object.animations = animations
        }

        res(object)
      })
    )
  }

  getModel() {
    return this.model
  }
}

export default Loader

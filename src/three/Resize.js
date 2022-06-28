import camera from './Camera'
import renderer from './Renderer'

class Resize {
  start() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  stop() {
    window.removeEventListener('resize', this.resize.bind(this))
  }

  resize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

const resize = new Resize()
export default resize

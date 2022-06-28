import Loader from '../utils/Loader'
import fileList from '../utils/fileList'

const animations = []

fileList.forEach((file) => animations.push(`/animations/${file}`))

const Xbot = new Loader('/models/xbot.fbx', animations, 0.01).getModel()

Xbot.modes = {
  walk: {
    idle: [0, 1, false],
    jump: [1, 1, true],
    left: [2, 1, false],
    right: [5, 1, false],
    ahead: [9, 1, false]
  },
  run: {
    idle: [0, 1, false],
    left: [3, 1, false],
    right: [6, 1, false],
    ahead: [8, 1, false]
  }
}

export default Xbot

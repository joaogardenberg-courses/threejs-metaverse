import {
  AmbientLight,
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper
} from 'three'
import scene from '../three/Scene'

const size = 15
const light = new AmbientLight(0x404040)
export const directionalLight = new DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 5, -5)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 512 * 8
directionalLight.shadow.mapSize.height = 512 * 8
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.fat = 500
directionalLight.shadow.camera.top = size
directionalLight.shadow.camera.bottom = size * 4
directionalLight.shadow.camera.left = size * 4
directionalLight.shadow.camera.right = size
directionalLight.target.position.set(0, 0, 0)
light.add(directionalLight)

// const helper = new DirectionalLightHelper(directionalLight, 1)
// const helper2 = new CameraHelper(directionalLight.shadow.camera)
// scene.add(helper)
// scene.add(helper2)

export default light

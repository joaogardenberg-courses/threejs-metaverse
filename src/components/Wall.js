import {
  BoxGeometry,
  Group,
  Mesh,
  MeshPhongMaterial,
  RepeatWrapping
} from 'three'
import texture from '../utils/Texture.js'

const geometry = new BoxGeometry(6, 3, 0.3)
const material = new MeshPhongMaterial()
const wall = new Mesh(geometry, material)
wall.receiveShadow = true
wall.castShadow = true
wall.position.y = 1.5

const wallGroup = new Group()

texture.wall.then((map) => {
  wall.material.map = map
  wall.material.map.wrapS = RepeatWrapping
  wall.material.map.wrapT = RepeatWrapping
  wall.material.map.repeat.set(2, 2)
  wall.material.needsUpdate = true

  for (let index = 0; index < 10; index++) {
    const tmp = wall.clone()
    wallGroup.add(tmp)
    tmp.position.z = index * 4 + 2
  }
})

export default wallGroup

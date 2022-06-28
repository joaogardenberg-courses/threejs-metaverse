import { BoxGeometry, MeshStandardMaterial, Mesh } from 'three'

const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshStandardMaterial({ color: 0xffff00 })
const box = new Mesh(geometry, material)
box.receiveShadow = true
box.castShadow = true
box.position.y = 2.5

export default box

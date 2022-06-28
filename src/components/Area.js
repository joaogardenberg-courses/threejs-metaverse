import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three'

const geometry = new BoxGeometry(6, 0.2, 4)
const material = new MeshPhongMaterial({ color: 0xffff00 })
const area = new Mesh(geometry, material)
area.position.y = 0.1
area.position.z = 4
area.material.transparent = true
area.material.opacity = 0.5

export default area

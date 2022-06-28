import { BackSide, Mesh, MeshStandardMaterial, PlaneGeometry } from 'three'

const geometry = new PlaneGeometry(100, 100)
const material = new MeshStandardMaterial({ color: 0xffff00, side: BackSide })
const plane = new Mesh(geometry, material)
plane.receiveShadow = true

export default plane

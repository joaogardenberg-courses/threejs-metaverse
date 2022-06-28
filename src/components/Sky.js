import { BackSide, Mesh, MeshBasicMaterial, SphereGeometry } from 'three'

const geometry = new SphereGeometry(50, 30, 30)
const material = new MeshBasicMaterial({ color: 0x87ceeb, side: BackSide })
const sky = new Mesh(geometry, material)

export default sky

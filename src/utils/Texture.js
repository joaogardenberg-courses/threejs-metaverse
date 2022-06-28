import { TextureLoader } from 'three'

const texture = {}

texture.ground = new Promise((res) => {
  const loader = new TextureLoader()
  loader.load('/images/ground.jpg', (texture) => {
    res(texture)
  })
})

texture.sky = new Promise((res) => {
  const loader = new TextureLoader()
  loader.load('/images/sky2.jpg', (texture) => {
    res(texture)
  })
})

texture.wall = new Promise((res) => {
  const loader = new TextureLoader()
  loader.load('/images/sky2.jpg', (texture) => {
    res(texture)
  })
})

export default texture

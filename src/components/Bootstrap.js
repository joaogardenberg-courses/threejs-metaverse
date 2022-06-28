import area from './Area'
import box from './Box'
import camera from '../three/Camera'
import CharacterController from '../utils/CharacterController'
import Xbot from '../characters/Xbot'
import coin from '../utils/Coin'
import machine from '../three/LoopMachine'
import plane from './Plane'
import renderer from '../three/Renderer'
import scene from '../three/Scene'
import sky from './Sky'
import soundHandler from '../utils/SoundHandler'
import texture from '../utils/Texture'
import { Color, RepeatWrapping } from 'three'

texture.sky.then((map) => {
  sky.material.map = map
  sky.material.map.wrapS = RepeatWrapping
  sky.material.map.wrapT = RepeatWrapping
  sky.material.map.repeat.set(70, 50)
  sky.material.needsUpdate = true
})
texture.ground.then((map) => {
  plane.material.map = map
  plane.material.map.wrapS = RepeatWrapping
  plane.material.map.wrapT = RepeatWrapping
  plane.material.map.repeat.set(10, 10)
  plane.material.needsUpdate = true
  plane.rotation.x += Math.PI * 0.5
})

let characterController = null
machine.addCallback(() => {
  if (characterController) characterController.run()
  box.rotation.y += 0.01
  renderer.render(scene, camera)
})
Xbot.then((mesh) => {
  scene.add(mesh)
  mesh.modes = Xbot.modes
  characterController = new CharacterController(mesh)
  characterController.start()
  //
  characterController.collisionWith(box)
  box.coins = 0
  characterController.onTriggerEnter(box, () => {
    box.material.color = new Color(0xff00000) //RED
    box.coins++
    coin.add() //display coin increment
    if (box.coins > 2) {
      characterController.collisionWithUndo(box)
      setTimeout(() => {
        document.body.querySelector('h1').innerText = 'Well done!'
        soundHandler.play('win')
      }, 500)
      let flag = false
      setInterval(() => {
        document.body.querySelector('h1').innerText = flag
          ? 'Shift to run!'
          : 'Tab to switch camera!'
        flag = !flag
      }, 5000)
    }
    soundHandler.play('coin')
  })
  characterController.onTriggerExit(box, () => {
    box.material.color = new Color(0xffff00) //YELLOW
  })
  characterController.collisionWith(area)
  characterController.onTriggerEnter(area, () => {
    if (box.coins != 0) return characterController.collisionWithUndo(area)
    document.body.querySelector('h1').innerText = 'Press space key to jump'
    setTimeout(() => {
      document.body.querySelector('h1').innerText = ''
    }, 3000)
  })
})

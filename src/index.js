import camera from './three/Camera'
import scene from './three/Scene'
import renderer from './three/Renderer'
import machine from './three/LoopMachine'
import resize from './three/Resize'
import light from './components/Light'
import box from './components/Box'
import plane from './components/Plane'
import sky from './components/Sky'
import wall from './components/Wall'
import area from './components/Area'
import Xbot from './characters/Xbot'
import keyListener from './utils/KeyListener'
import CharacterController from './utils/CharacterController'
import { Color, FogExp2 } from 'three'
import eventBus from './utils/EventBus'
import SoundHandler from './utils/SoundHandler'
import './utils/Collision'
import './components/Bootstrap'
import './index.scss'

camera.position.set(0, 1.8, -3)
camera.lookAt(box.position)
resize.start()

scene.add(box)
scene.add(plane)
scene.add(sky)
scene.add(wall)
scene.add(area)
scene.add(light)

scene.fog = new FogExp2(0xcce0ff, 0.05)

let characterController
Xbot.then((mesh) => {
  scene.add(mesh)
  mesh.modes = Xbot.modes
  characterController = new CharacterController(mesh)
  characterController.start()
  characterController.collisionWith(box)

  characterController.onTriggerEnter(
    box,
    () => (box.material.color = new Color(0xff0000))
  )

  characterController.onTriggerExit(
    box,
    () => (box.material.color = new Color(0xffff00))
  )
})

keyListener.setCaster((data) => eventBus.dispatch('keyListener', data))

machine.addCallback(() => {
  if (characterController) {
    characterController.run()
  }

  renderer.render(scene, camera)
})

const soundHandler = new SoundHandler('')

document.querySelector('button').addEventListener('click', () => {
  document.querySelector('h1').innerText = 'Press "W A S D"'
  document.querySelector('button').remove()
  keyListener.start()
  machine.start()
  coin.start()
  soundHandler.setAsLoop('environment')
  soundHandler.setVolume('environment', 0.3)
  soundHandler.play('environment')
})

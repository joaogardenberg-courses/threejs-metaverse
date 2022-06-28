import { Box3, Box3Helper, Color, Vector3 } from 'three'
import Xbot from '../characters/Xbot'
import box from '../components/Box'
import machine from '../three/LoopMachine'
import scene from '../three/Scene'

const bbMesh = new Box3()
const bbBox = new Box3()

Xbot.then((mesh) => {
  const helper = new Box3Helper(bbMesh, 0xffff00)
  scene.add(helper)
  bbBox.setFromObject(box)

  machine.addCallback(() => {
    bbMesh.setFromCenterAndSize(
      mesh.position.clone().add(new Vector3(0, 0.9, 0)),
      new Vector3(0.5, 1.8, 0.5)
    )

    if (bbMesh.intersectsBox(bbBox)) {
      box.material.color = new Color(0xff0000)
    } else {
      box.material.color = new Color(0xffff00)
    }
  })
})

import * as THREE from 'three'
import Experience from '@class/Experience'
import Sizes from '@class/Utils/Sizes'

export default class Camera {
  experience: Experience
  sizes: Sizes
  scene: THREE.Scene
  canvas: HTMLCanvasElement | null = null

  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
  }
}

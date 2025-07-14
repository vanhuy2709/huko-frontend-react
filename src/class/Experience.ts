import * as THREE from 'three'
import Sizes from '@class/Utils/Sizes'
import Camera from '@class/Utils/Camera'

export default class Experience {
  canvas: HTMLCanvasElement | null = null
  static instance: Experience | null = null
  scene: THREE.Scene
  sizes: Sizes
  camera: Camera

  constructor(canvas: HTMLCanvasElement) {
    if (Experience.instance) {
      return Experience.instance
    }
    Experience.instance = this
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.sizes = new Sizes()
    this.camera = new Camera()
  }
}

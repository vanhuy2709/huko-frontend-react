import * as THREE from 'three';
import Experience from './Experience';
import Sizes from './utils/Sizes';
import Camera from './Camera';

export default class Renderer {
  private _experience: Experience;
  private _scene: THREE.Scene;
  private _canvas: HTMLCanvasElement;
  private _sizes: Sizes;
  private _camera: Camera;
  private _renderer!: THREE.WebGLRenderer;

  public get experience(): Experience {
    return this._experience;
  }
  public get sizes(): Sizes {
    return this._sizes;
  }
  public get scene(): THREE.Scene {
    return this._scene;
  }
  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }
  public get camera(): Camera {
    return this._camera;
  }
  public get renderer(): THREE.WebGLRenderer {
    return this._renderer;
  }

  constructor() {
    this._experience = new Experience();
    this._sizes = this._experience.sizes;
    this._scene = this._experience.scene;
    this._canvas = this._experience.canvas;
    this._camera = this._experience.camera;

    this.setRenderer();
  }

  public setRenderer() {
    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: true
    });

    // this._renderer.physicallyCorrectLights = true;
    // this._renderer.outputEncoding = THREE.sRGBEncoding;
    this._renderer.toneMapping = THREE.CineonToneMapping;
    this._renderer.toneMappingExposure = 1.75;
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._renderer.setSize(this._sizes.width, this._sizes.height);
    this._renderer.setPixelRatio(this._sizes.pixelRatio);
  }

  public resize() {
    this._renderer.setSize(this._sizes.width, this._sizes.height);
    this._renderer.setPixelRatio(this._sizes.pixelRatio);
  }

  public update() {
    // this._renderer.setViewport(0, 0, this._sizes.width, this._sizes.height);
    this._renderer.render(this._scene, this._camera.orthographicCamera);
    // Second screen
    // this._renderer.setScissorTest(true);
    // this._renderer.setViewport(
    //   this._sizes.width - this._sizes.width / 3,
    //   this._sizes.height - this._sizes.height / 3,
    //   this._sizes.width / 3,
    //   this._sizes.height / 3
    // );

    // this._renderer.setScissor(
    //   this._sizes.width - this._sizes.width / 3,
    //   this._sizes.height - this._sizes.height / 3,
    //   this._sizes.width / 3,
    //   this._sizes.height / 3
    // );

    // this._renderer.render(this._scene, this._camera.perspectiveCamera);

    // this._renderer.setScissorTest(false);
  }
}

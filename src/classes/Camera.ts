import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Experience from './Experience';
import Sizes from './utils/Sizes';

export default class Camera {
  private _experience: Experience;
  private _scene: THREE.Scene;
  private _canvas: HTMLCanvasElement;
  private _sizes: Sizes;
  private _perspectiveCamera!: THREE.PerspectiveCamera;
  private _orthographicCamera!: THREE.OrthographicCamera;
  private _frustrum!: number;
  private _controls!: OrbitControls;
  private _helper!: THREE.CameraHelper;

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
  public get perspectiveCamera(): THREE.PerspectiveCamera {
    return this._perspectiveCamera;
  }
  public get orthographicCamera(): THREE.OrthographicCamera {
    return this._orthographicCamera;
  }
  public get frustrum(): number {
    return this._frustrum;
  }
  public get controls(): OrbitControls {
    return this._controls;
  }
  public get helper(): THREE.CameraHelper {
    return this._helper;
  }

  constructor() {
    this._experience = new Experience();
    this._sizes = this._experience.sizes;
    this._scene = this._experience.scene;
    this._canvas = this._experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  public createPerspectiveCamera() {
    this._perspectiveCamera = new THREE.PerspectiveCamera(35, this._sizes.aspect, 0.1, 1000);
    this._scene.add(this._perspectiveCamera);
    this._perspectiveCamera.position.x = 29;
    this._perspectiveCamera.position.y = 14;
    this._perspectiveCamera.position.z = 12;
  }

  public createOrthographicCamera() {
    this._orthographicCamera = new THREE.OrthographicCamera(
      (-this._sizes.aspect * this._sizes.frustrum) / 2,
      (this._sizes.aspect * this._sizes.frustrum) / 2,
      this._sizes.frustrum / 2,
      -this._sizes.frustrum / 2,
      -50,
      50
    );

    this._orthographicCamera.position.y = 3.5;
    this._orthographicCamera.position.z = 5;
    this._orthographicCamera.rotation.x = -Math.PI / 6;

    this._scene.add(this._orthographicCamera);

    // this._helper = new THREE.CameraHelper(this._orthographicCamera);
    // this._scene.add(this._helper);

    // const size = 20;
    // const divisions = 20;

    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this._scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(10);
    // this._scene.add(axesHelper);
  }

  public setOrbitControls() {
    this._controls = new OrbitControls(this._perspectiveCamera, this._canvas);
    this._controls.enableDamping = true;
    this._controls.enableZoom = false;
  }

  public resize() {
    // updating perspective camera
    this._perspectiveCamera.aspect = this._sizes.aspect;
    this._perspectiveCamera.updateProjectionMatrix();

    // updating orthographic camera
    this._orthographicCamera.left = (-this._sizes.aspect * this._sizes.frustrum) / 2;
    this._orthographicCamera.right = (this._sizes.aspect * this._sizes.frustrum) / 2;
    this._orthographicCamera.top = this._sizes.frustrum / 2;
    this._orthographicCamera.bottom = -this._sizes.frustrum / 2;
    this._orthographicCamera.updateProjectionMatrix();
  }

  update() {
    this._controls.update();
    // this._helper.matrixWorldNeedsUpdate = true;
    // this._helper.update();

    // this._helper.position.copy(this._orthographicCamera.position);
    // this._helper.rotation.copy(this._orthographicCamera.rotation);
  }
}

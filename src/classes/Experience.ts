import * as THREE from 'three';

import Sizes from './utils/Sizes';
import Time from './utils/Time';
import Resources from './utils/Resources';
import Assets from './utils/Assets';

import Camera from './Camera';
import Theme from './Theme';
import Renderer from './Renderer';

import World from './world/World';
import Controls from './world/Controls';

export default class Experience {
  private static instance: Experience;
  private _canvas!: HTMLCanvasElement;
  private _scene!: THREE.Scene;
  private _sizes!: Sizes;
  private _camera!: Camera;
  private _renderer!: Renderer;
  private _time!: Time;
  private _world!: World;
  private _resources!: Resources;
  private _theme!: Theme;
  private _controls!: Controls;

  public get canvas() {
    return this._canvas;
  }
  public get scene() {
    return this._scene;
  }
  public get sizes() {
    return this._sizes;
  }
  public get camera() {
    return this._camera;
  }
  public get renderer() {
    return this._renderer;
  }
  public get time() {
    return this._time;
  }
  public get world() {
    return this._world;
  }
  public get resources(): Resources {
    return this._resources;
  }
  public get theme(): Theme {
    return this._theme;
  }
  public get controls(): Controls {
    return this._controls;
  }

  constructor(canvas?: HTMLCanvasElement) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    if (canvas) {
      this._canvas = canvas;
    }

    this._scene = new THREE.Scene();
    this._sizes = new Sizes();
    this._camera = new Camera();
    this._renderer = new Renderer();
    this._time = new Time();
    this._resources = new Resources(Assets);
    this._theme = new Theme();
    this._world = new World();

    this._sizes.on('resize', () => {
      this.resize();
    });

    this._time.on('update', () => {
      this.update();
    });
  }

  public resize() {
    this._camera.resize();
    this._world.resize();
    this._renderer.resize();
  }

  public update() {
    this._camera.update();
    this._world.update();
    this._renderer.update();

    if (this._controls) {
      this._controls.update();
    }
  }

  public destroy() {
    console.log('destroying experience...');

    // Properly cleanup time to stop animation loop
    if (this._time) {
      this._time.destroy();
    }

    // Remove event listeners from sizes
    if (this._sizes) {
      this._sizes.removeAllListeners();
    }

    // Clear the singleton instance so a new one can be created
    Experience.instance = null as any;
  }
}

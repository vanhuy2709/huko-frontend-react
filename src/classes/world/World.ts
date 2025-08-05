import * as THREE from 'three';
import Experience from '../Experience';
import Sizes from '../utils/Sizes';
import Camera from '../Camera';
import Room from './Room';
import Resources from '@classes/utils/Resources';
import EventEmitter from 'events';
import Environment from './Environment';
import Controls from './Controls';
import Floor from './Floor';
import Theme from '@classes/Theme';

export default class World extends EventEmitter {
  private _experience: Experience;
  private _scene: THREE.Scene;
  private _canvas: HTMLCanvasElement;
  private _sizes: Sizes;
  private _camera: Camera;
  private _renderer!: THREE.WebGLRenderer;
  private _room!: Room;
  private _resources: Resources;
  private _environment!: Environment;
  private _controls!: Controls;
  private _floor!: Floor;
  private _theme!: Theme;

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
  public get room(): Room {
    return this._room;
  }
  public get resources(): Resources {
    return this._resources;
  }
  public get environment(): Environment {
    return this._environment;
  }
  public get controls(): Controls {
    return this._controls;
  }
  public get theme(): Theme {
    return this._theme;
  }
  public get floor(): Floor {
    return this._floor;
  }

  constructor() {
    super();
    this._experience = new Experience();
    this._sizes = this._experience.sizes;
    this._scene = this._experience.scene;
    this._canvas = this._experience.canvas;
    this._camera = this._experience.camera;
    this._resources = this._experience.resources;
    this._theme = this._experience.theme;

    this._resources.on('ready', () => {
      this._environment = new Environment();
      this._floor = new Floor();
      this._room = new Room();
      this._controls = new Controls();
      this.emit('worldready');
    });

    this._theme.on('switch', theme => {
      this.switchTheme(theme);
    });
  }

  public switchTheme(theme: 'light' | 'dark') {
    if (this._environment) {
      this._environment.switchTheme(theme);
    }
  }

  public resize() {}

  public update() {
    if (this._room) {
      this._room.update();
    }
    if (this._controls) {
      this._controls.update();
    }
  }
}

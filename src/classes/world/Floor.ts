import * as THREE from 'three';
import Experience from '../Experience';

export default class Floor {
  private _experience: Experience;
  private _scene: THREE.Scene;
  private _geometry!: THREE.PlaneGeometry;
  private _material!: THREE.MeshStandardMaterial;
  private _plane!: THREE.Mesh;
  private _circleFirst!: THREE.Mesh;
  private _circleSecond!: THREE.Mesh;
  private _circleThird!: THREE.Mesh;

  public get experience(): Experience {
    return this._experience;
  }
  public get scene(): THREE.Scene {
    return this._scene;
  }
  public get circleFirst(): THREE.Mesh {
    return this._circleFirst;
  }
  public get circleSecond(): THREE.Mesh {
    return this._circleSecond;
  }
  public get circleThird(): THREE.Mesh {
    return this._circleThird;
  }

  constructor() {
    this._experience = new Experience();
    this._scene = this._experience.scene;

    this.setFloor();
  }

  public setFloor() {
    this._geometry = new THREE.PlaneGeometry(100, 100);
    this._material = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      side: THREE.BackSide
    });
    this._plane = new THREE.Mesh(this._geometry, this._material);
    this._scene.add(this._plane);
    this._plane.rotation.x = Math.PI / 2;
    this._plane.position.y = -0.3;
    this._plane.receiveShadow = true;
  }

  public resize() {}

  public update() {}
}

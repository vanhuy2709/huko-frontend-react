import * as THREE from 'three';
import Experience from '../Experience';
import Resources from '@classes/utils/Resources';
import Time from '@classes/utils/Time';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import gsap from 'gsap';

export default class Room {
  private _experience: Experience;
  private _scene: THREE.Scene;
  private _resources: Resources;
  private _time: Time;
  private _room: GLTF | THREE.VideoTexture;
  private _actualRoom: THREE.Group;
  private _mixer!: THREE.AnimationMixer;
  private _swim!: THREE.AnimationAction;
  private _lerp: { current: number; target: number; ease: number };
  private _rotation: number = 0;
  private _rectLight!: THREE.RectAreaLight;
  private _roomChildren: Record<string, THREE.Group | THREE.RectAreaLight> = {};

  public get experience(): Experience {
    return this._experience;
  }
  public get scene(): THREE.Scene {
    return this._scene;
  }
  public get actualRoom(): THREE.Group {
    return this._actualRoom;
  }
  public get roomChildren(): Record<string, THREE.Group | THREE.RectAreaLight> {
    return this._roomChildren;
  }

  constructor() {
    this._experience = new Experience();
    this._scene = this._experience.scene;

    this._resources = this._experience.resources;
    this._time = this._experience.time;
    this._room = this._resources.items.room;
    if ('scene' in this._room) {
      this._actualRoom = this._room.scene;
    } else throw new Error('The room resource does not contain a scene.');

    this._lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    };

    const width = 0.5;
    const height = 0.7;
    const intensity = 1;
    this._rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }

  public setModel() {
    for (const child of this._actualRoom.children) {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        for (const groupChild of child.children) {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        }
      }

      if (child.name === 'Aquarium' && child.children[0] instanceof THREE.Mesh) {
        child.children[0].material = new THREE.MeshPhysicalMaterial();
        child.children[0].material.roughness = 0;
        child.children[0].material.color.set(0x549dd2);
        child.children[0].material.ior = 3;
        child.children[0].material.transmission = 1;
        child.children[0].material.opacity = 1;
        child.children[0].material.depthWrite = false;
        child.children[0].material.depthTest = false;
      }

      if (child.name === 'Computer' && child.children[1] instanceof THREE.Mesh) {
        child.children[1].material = new THREE.MeshStandardMaterial({
          map:
            this._resources.items.screen instanceof THREE.VideoTexture
              ? this._resources.items.screen
              : undefined
        });
      }

      if (child.name === 'Mini_Floor') {
        child.position.x = -0.289521;
        child.position.z = 8.83572;
      }

      // child.scale.set(0, 0, 0);
      // if (child.name === 'Cube') {
      //   child.position.set(0, -1, 0);
      //   child.rotation.y = Math.PI / 4;
      // }
      this._roomChildren[child.name.toLowerCase()] = child as THREE.Group;
    }

    this._rectLight.position.set(7.68244, 7, 0.5);
    this._rectLight.rotation.x = -Math.PI / 2;
    this._rectLight.rotation.z = Math.PI / 4;
    this._actualRoom.add(this._rectLight);

    this._roomChildren['rectLight'] = this._rectLight;

    this._scene.add(this._actualRoom);
    this._actualRoom.scale.set(0.11, 0.11, 0.11);
  }

  public setAnimation() {
    this._mixer = new THREE.AnimationMixer(this._actualRoom);

    if ('animations' in this._room) {
      this._swim = this._mixer.clipAction(this._room.animations[0]);
    } else throw new Error('The room resource does not contain animations.');

    this._swim.play();
  }

  public onMouseMove() {
    globalThis.addEventListener('mousemove', (e: MouseEvent) => {
      this._rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;

      this._lerp.target = this._rotation * 0.1;
    });
  }

  public resize() {}

  public update() {
    this._lerp.current = gsap.utils.interpolate(
      this._lerp.current,
      this._lerp.target,
      this._lerp.ease
    );
    this._actualRoom.rotation.y = this._lerp.current;
    this._mixer.update(this._time.delta * 0.0009);
  }
}

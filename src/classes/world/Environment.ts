import Experience from '@classes/Experience';
import Resources from '@classes/utils/Resources';
import gsap from 'gsap';
import * as THREE from 'three';

export default class Environment {
  private _experience: Experience;
  private _scene: THREE.Scene;
  private _resources!: Resources;

  private _sunLight!: THREE.DirectionalLight;
  private _ambientLight!: THREE.AmbientLight;

  constructor() {
    this._experience = new Experience();
    this._scene = this._experience.scene;

    this.setSunlight();
    // this.setAmbientLight();
  }

  private setSunlight() {
    this._sunLight = new THREE.DirectionalLight('#ffffff', 3);
    this._sunLight.castShadow = true;
    this._sunLight.shadow.camera.far = 20;
    this._sunLight.shadow.mapSize.set(2048, 2048);
    this._sunLight.shadow.normalBias = 0.05;
    this._sunLight.position.set(-1.5, 7, 3);
    this._scene.add(this._sunLight);

    this._ambientLight = new THREE.AmbientLight('#ffffff', 1);
    this._scene.add(this._ambientLight);

    // this._sunLight.position.set(5, 7, -2);
    // this._sunLight.castShadow = true;
    // this._sunLight.shadow.mapSize.set(1024, 1024);
    // this._sunLight.shadow.camera.far = 15;
    // this._sunLight.shadow.normalBias = 0.05;
    // this._experience.scene.add(this._sunLight);
  }

  public switchTheme(theme: 'light' | 'dark') {
    if (theme === 'dark') {
      gsap.to(this._sunLight.color, {
        r: 0.172_549_019_607_843_13,
        g: 0.231_372_549_019_607_85,
        b: 0.686_274_509_803_921_6
      });
      gsap.to(this._ambientLight.color, {
        r: 0.172_549_019_607_843_13,
        g: 0.231_372_549_019_607_85,
        b: 0.686_274_509_803_921_6
      });
      gsap.to(this._sunLight, {
        intensity: 0.78
      });
      gsap.to(this._ambientLight, {
        intensity: 0.78
      });
    } else {
      gsap.to(this._sunLight.color, {
        r: 1,
        g: 1,
        b: 1
      });
      gsap.to(this._ambientLight.color, {
        r: 1,
        g: 1,
        b: 1
      });
      gsap.to(this._sunLight, {
        intensity: 3
      });
      gsap.to(this._ambientLight, {
        intensity: 1
      });
    }
  }

  public resize() {}

  public update() {}
}

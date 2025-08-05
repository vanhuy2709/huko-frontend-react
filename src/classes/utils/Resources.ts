import * as THREE from 'three';
import Experience from '@classes/Experience';
import Renderer from '@classes/Renderer';
import { EventEmitter } from 'events';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export default class Resources extends EventEmitter {
  private _experience: Experience;
  private _renderer: Renderer;
  private _assets: TAssets[] = [];
  private loaders!: { gltfLoader: GLTFLoader; dracoLoader: DRACOLoader };
  private _items: { [key: string]: GLTF | THREE.VideoTexture };
  private queue: number;
  private loaded: number;
  private video: { [key: string]: HTMLVideoElement } | undefined;
  private videoTexture: { [key: string]: THREE.VideoTexture } | undefined;

  public get experience(): Experience {
    return this._experience;
  }
  public get renderer(): Renderer {
    return this._renderer;
  }
  public get items() {
    return this._items;
  }

  constructor(assets: TAssets[]) {
    super();
    this._experience = new Experience();
    this._renderer = this._experience.renderer;
    this._assets = assets;

    this._items = {};
    this.queue = this._assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  public setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      dracoLoader: new DRACOLoader()
    };
    // this.loaders.gltfLoader = new GLTFLoader();
    // this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath('/draco/');
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  public startLoading() {
    for (const asset of this._assets) {
      if (asset.type === 'glbModel') {
        this.loaders.gltfLoader.load(asset.path, file => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === 'videoTexture') {
        this.video = {};
        this.videoTexture = {};

        this.video[asset.name] = document.createElement('video');
        this.video[asset.name].src = asset.path;
        this.video[asset.name].muted = true;
        this.video[asset.name].playsInline = true;
        this.video[asset.name].autoplay = true;
        this.video[asset.name].loop = true;
        this.video[asset.name].play();

        this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name]);
        this.videoTexture[asset.name].flipY = true;
        this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
        this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
        this.videoTexture[asset.name].generateMipmaps = false;
        this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;

        this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
      }
    }
  }

  public singleAssetLoaded(asset: TAssets, file: GLTF | THREE.VideoTexture) {
    this._items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) this.emit('ready');
  }
}

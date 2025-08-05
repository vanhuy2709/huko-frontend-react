import { EventEmitter } from 'events';

export default class Sizes extends EventEmitter {
  private _width: number;
  private _height: number;
  private _aspect: number;
  private _pixelRatio: number;
  private _frustrum: number;
  private _device: 'desktop' | 'mobile';

  public get width(): number {
    return this._width;
  }
  public get height(): number {
    return this._height;
  }
  public get aspect(): number {
    return this._aspect;
  }
  public get pixelRatio(): number {
    return this._pixelRatio;
  }
  public get frustrum(): number {
    return this._frustrum;
  }
  public get device(): 'desktop' | 'mobile' {
    return this._device;
  }

  constructor() {
    super();
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._aspect = this.width / this.height;
    this._pixelRatio = Math.min(window.devicePixelRatio, 2); // Limit to 2 for performance
    this._frustrum = 5;

    this._device = this._width < 968 ? 'mobile' : 'desktop';

    window.addEventListener('resize', () => {
      this._width = window.innerWidth;
      this._height = window.innerHeight;
      this._aspect = this._width / this._height;
      this._pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit('resize');

      if (this._width < 968 && this._device !== 'mobile') {
        this._device = 'mobile';
        this.emit('switchdevice', this._device);
      } else if (this._width >= 968 && this._device !== 'desktop') {
        this._device = 'desktop';
        this.emit('switchdevice', this._device);
      }
    });
  }
}

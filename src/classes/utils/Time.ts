import { EventEmitter } from 'events';

export default class Time extends EventEmitter {
  private _start: number;
  private _current: number;
  private _elapsed: number;
  private _delta: number;
  private _animationId: number | null = null;

  public get delta(): number {
    return this._delta;
  }

  constructor() {
    super();
    this._start = Date.now();
    this._current = this._start;
    this._elapsed = 0;
    this._delta = 16; // Default delta time for 60 FPS

    this.update();
  }

  public update() {
    const currentTime = Date.now();
    this._delta = currentTime - this._current;
    this._current = currentTime;
    this._elapsed = this._current - this._start;

    this.emit('update');
    this._animationId = globalThis.requestAnimationFrame(() => this.update());
  }

  public destroy() {
    if (this._animationId) {
      globalThis.cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }
    this.removeAllListeners();
  }
}

import { EventEmitter } from 'events';

export default class Theme extends EventEmitter {
  private _theme: 'light' | 'dark';
  private _toggleButton: HTMLButtonElement;
  private _toggleCircle: HTMLDivElement;

  constructor() {
    super();
    this._theme = 'light';
    this._toggleButton = document.querySelector('.toggle-button')!;
    this._toggleCircle = document.querySelector('.toggle-circle')!;
    this.setEventListeners();
  }

  public setEventListeners() {
    if (this._toggleButton) {
      this._toggleButton.addEventListener('click', () => {
        this._toggleCircle.classList.toggle('slide');

        this._theme = this._theme === 'light' ? 'dark' : 'light';

        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');

        this.emit('switch', this._theme);
      });
    }
  }
}

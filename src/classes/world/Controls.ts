import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ASScroll from '@ashthornton/asscroll';

import Experience from '../Experience';
import Resources from '@classes/utils/Resources';
import Time from '@classes/utils/Time';
import Camera from '@classes/Camera';
import Sizes from '@classes/utils/Sizes';

export default class Controls {
  private _experience: Experience;
  private _scene: THREE.Scene;
  private _resources: Resources;
  private _time: Time;
  private _curve!: THREE.CatmullRomCurve3;
  private _camera: Camera;
  private _timeline!: gsap.core.Timeline;
  private _room!: THREE.Group;
  private _sizes!: Sizes;
  private _rectLight!: THREE.RectAreaLight;

  // GSAP Timeline animation
  private _firstMoveTimeline: gsap.core.Timeline;
  private _secondMoveTimeline: gsap.core.Timeline;
  private _thirdMoveTimeline: gsap.core.Timeline;

  private _asscroll: ASScroll | null = null;

  // Mini Platform Animations
  private _secondPartTimeline!: gsap.core.Timeline;

  public get experience(): Experience {
    return this._experience;
  }
  public get scene(): THREE.Scene {
    return this._scene;
  }
  public get resources(): Resources {
    return this._resources;
  }
  public get time(): Time {
    return this._time;
  }
  public get curve(): THREE.CatmullRomCurve3 {
    return this._curve;
  }
  public get camera(): Camera {
    return this._camera;
  }
  public get timeline(): gsap.core.Timeline {
    return this._timeline;
  }
  public get room(): THREE.Group {
    return this._room;
  }
  public get sizes(): Sizes {
    return this._sizes;
  }
  public get rectLight(): THREE.RectAreaLight {
    return this._rectLight;
  }

  constructor() {
    this._experience = new Experience();

    this._scene = this._experience.scene;
    this._sizes = this._experience.sizes;
    this._resources = this._experience.resources;
    this._time = this._experience.time;
    this._camera = this._experience.camera;
    this._room = this._experience.world.room.actualRoom;

    this._room.children.forEach(child => {
      if (child.type === 'RectAreaLight') {
        this._rectLight = child as THREE.RectAreaLight;
      }
    });

    gsap.registerPlugin(ScrollTrigger);

    this._firstMoveTimeline = this.createGsapTimeline('.first-move');
    this._secondMoveTimeline = this.createGsapTimeline('.second-move');
    this._thirdMoveTimeline = this.createGsapTimeline('.third-move');
    // this.setSmoothScroll();
    this.setScrollTrigger();
  }

  public setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.1,
      disableRaf: true
    });

    gsap.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length > 0) {
          asscroll.currentPos = value ?? 0;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      fixedMarkers: true
    });

    asscroll.on('update', ScrollTrigger.update);
    ScrollTrigger.addEventListener('refresh', asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          '.gsap-marker-start, .gsap-marker-end, [asscroll]'
        )
      });
    });
    return asscroll;
  }

  public setSmoothScroll() {
    this._asscroll = this.setupASScroll();
  }

  public setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // Desktop
      '(min-width: 969px)': () => {
        this._room.scale.set(0.11, 0.11, 0.11);
        this._rectLight.width = 0.5;
        this._rectLight.height = 0.7;
        this._camera.orthographicCamera.position.set(0, 6.5, 10);
        this._room.position.set(0, 0, 0);

        // First section --------------------
        this._firstMoveTimeline.to(this._room.position, {
          x: () => this._sizes.width * 0.0014
        });

        // Second section --------------------
        this._secondMoveTimeline
          .to(
            this._room.position,
            {
              x: () => 1,
              z: () => this._sizes.height * 0.0032
            },
            'same'
          )
          .to(
            this._room.scale,
            {
              x: 0.4,
              y: 0.4,
              z: 0.4
            },
            'same'
          )
          .to(
            this._rectLight,
            {
              width: 0.5 * 4,
              height: 0.7 * 4
            },
            'same'
          );

        // Third section --------------------
        this._thirdMoveTimeline.to(this._camera.orthographicCamera.position, {
          y: 1.5,
          x: -4.1
        });
      },

      // Mobile
      '(max-width: 968px)': () => {
        // Resets
        this._room.scale.set(0.07, 0.07, 0.07);
        this._room.position.set(0, 0, 0);
        this._rectLight.width = 0.3;
        this._rectLight.height = 0.4;
        this._camera.orthographicCamera.position.set(0, 6.5, 10);

        // First section -----------------------------------------
        this._firstMoveTimeline.to(this.room.scale, {
          x: 0.1,
          y: 0.1,
          z: 0.1
        });

        // Second section -----------------------------------------
        this._secondMoveTimeline
          .to(
            this.room.scale,
            {
              x: 0.25,
              y: 0.25,
              z: 0.25
            },
            'same'
          )
          .to(
            this.rectLight,
            {
              width: 0.3 * 3.4,
              height: 0.4 * 3.4
            },
            'same'
          )
          .to(
            this.room.position,
            {
              x: 1.5
            },
            'same'
          );

        // Third section -----------------------------------------
        this._thirdMoveTimeline.to(this.room.position, {
          z: -4.5
        });
      },

      // all
      all: () => {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
          const progressWrapper = section.querySelector('.progress-wrapper');
          const progressBar = section.querySelector('.progress-bar');

          if (section.classList.contains('right')) {
            gsap.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.6
              }
            });
            gsap.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 0.6
              }
            });
          } else {
            gsap.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.6
              }
            });
            gsap.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 0.6
              }
            });
          }
          gsap.from(progressBar, {
            scaleY: 0,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.4,
              pin: progressWrapper,
              pinSpacing: false
            }
          });
        });

        // Mini Platform Animations
        this._secondPartTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'center center'
          }
        });

        let first!: gsap.core.Tween;
        let second!: gsap.core.Tween;
        let third!: gsap.core.Tween;
        let fourth!: gsap.core.Tween;
        let fifth!: gsap.core.Tween;
        let sixth!: gsap.core.Tween;
        let seventh!: gsap.core.Tween;
        let eighth!: gsap.core.Tween;
        let ninth!: gsap.core.Tween;

        this._room.children.forEach(child => {
          if (child.name === 'Mini_Floor') {
            first = gsap.to(child.position, {
              x: -5.44055,
              z: 13.6135,
              duration: 0.3
            });
          }

          if (child.name === 'Mailbox') {
            second = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.3
            });
          }

          if (child.name === 'Lamp') {
            third = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2)',
              duration: 0.3
            });
          }
          if (child.name === 'FloorFirst') {
            fourth = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2)',
              duration: 0.3
            });
          }
          if (child.name === 'FloorSecond') {
            fifth = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.3
            });
          }
          if (child.name === 'FloorThird') {
            sixth = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2)',
              duration: 0.3
            });
          }
          if (child.name === 'Dirt') {
            seventh = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2)',
              duration: 0.3
            });
          }
          if (child.name === 'Flower1') {
            eighth = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2)',
              duration: 0.3
            });
          }
          if (child.name === 'Flower2') {
            ninth = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2)',
              duration: 0.3
            });
          }
        });

        this._secondPartTimeline.add(first);
        this._secondPartTimeline.add(second);
        this._secondPartTimeline.add(third);
        this._secondPartTimeline.add(fourth, '-=0.2');
        this._secondPartTimeline.add(fifth, '-=0.2');
        this._secondPartTimeline.add(sixth, '-=0.2');
        this._secondPartTimeline.add(seventh, '-=0.2');
        this._secondPartTimeline.add(eighth);
        this._secondPartTimeline.add(ninth, '-=0.1');
      }
    });
  }

  public createGsapTimeline(triggerClass: string) {
    return gsap.timeline({
      scrollTrigger: {
        trigger: `${triggerClass}`,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        invalidateOnRefresh: true
      }
    });
  }

  public resize() {}

  public update() {}
}

import './home.css';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from '@tanstack/react-router';
import Experience from '@classes/Experience';
import SunIcon from '@components/SunIcon';
import MoonIcon from '@components/MoonIcon';
import ArrowRightIcon from '@components/ArrowIcon';

const HomePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const experienceRef = useRef<Experience | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      experienceRef.current = new Experience(canvasRef.current);

      // Cleanup on component unmount
      return () => {
        if (experienceRef.current) {
          experienceRef.current.destroy();
          experienceRef.current = null;
        }
      };
    }
  }, []);

  useEffect(() => {
    gsap.to('#bouncing-arrow', {
      x: 25,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <React.Fragment>
      <div className="experience">
        <canvas ref={canvasRef} className="experience-canvas"></canvas>
      </div>

      <div className="page">
        <div className="toggle-bar">
          <div className="sun-wrapper">
            <SunIcon />
          </div>
          <button className="toggle-button">
            <div className="toggle-circle"></div>
          </button>
          <div className="moon-wrapper">
            <MoonIcon />
          </div>
        </div>

        <div className="page-wrapper">
          <section className="hero">
            <div className="hero-wrapper">
              {/* Intro Stuff  */}
              {/* <div className="intro-text">Welcome to my portfolio!</div> */}
              <div className="arrow-svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <path
                    fill="currentColor"
                    d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z"
                  />
                </svg>
              </div>

              <div className="hero-main">
                <h1 className="hero-main-title">HukoChi</h1>
                <p className="hero-main-description">Project Manager | Media Leader</p>
              </div>

              <div className="hero-second">
                <p className="hero-second-subheading first-sub">HukoChi</p>
                <p className="hero-second-subheading second-sub">Portfolio</p>
              </div>

              <div className="hero-main">
                <h1 className="hero-main-title">HukoChi</h1>
                <p className="hero-main-description">Project Manager | Media Leader</p>
              </div>

              <div className="hero-second">
                <p className="hero-second-subheading first-sub">HukoChi</p>
                <p className="hero-second-subheading second-sub">Portfolio</p>
              </div>
            </div>
          </section>

          <div className="first-move section-margin"></div>

          <section className="first-section section left">
            <div className="progress-wrapper progress-bar-wrapper-left">
              <div className="progress-bar"></div>
            </div>

            <div className="section-intro-wrapper">
              <h1 className="section-title">
                <span className="section-title-text">About Me</span>
                <div className="section-title-decoration styleOne"></div>
                <div className="section-title-decoration styleTwo"></div>
                <div className="section-title-decoration styleThree"></div>
              </h1>
              <span className="section-number">01</span>
            </div>

            <div className="section-detail-wrapper">
              <p className="section-text">
                Hi there 👋! I'm a third-year digital media student from UK currently studying in
                Germany. My dream is to work for Disney or Pixar one day.
              </p>
              <p className="section-text">
                I love creating art and playing with my cats! I also like drinking bubble tea and
                going for hikes! Totally hippie lol ✌️. Welcome to my portfolio!
              </p>
              <p className="section-text">
                <Link to={'/about'}>
                  <ArrowRightIcon id="bouncing-arrow" />
                </Link>
              </p>
            </div>
          </section>

          <div className="second-move section-margin"></div>

          <section className="second-section section right">
            <div className="progress-wrapper progress-bar-wrapper-right">
              <div className="progress-bar blue-background"></div>
            </div>

            <div className="section-intro-wrapper blue-text blue-border">
              <h1 className="section-title blue-text blue-border">
                <span className="section-title-text blue-text">My Work</span>
                <div className="section-title-decoration styleOne blue-border"></div>
                <div className="section-title-decoration styleTwo blue-border"></div>
                <div className="section-title-decoration styleThree blue-background blue-border"></div>
              </h1>
              <span className="section-number blue-text">02</span>
            </div>

            <div className="section-detail-wrapper">
              <h3 className="section-heading">Candycane Village</h3>
              <p className="section-text">
                This project is in progress but it's about a super colorful village where the entire
                world including the people are candies. So far the story is that they are set out to
                explore their "space" only to realize it's a human that will try to destroy them.
              </p>
              <h3 className="section-heading">Rebecca's Reddish Radishes</h3>
              <p className="section-text">
                Oh what's that? Why, it's a red radish! Oop, another one! In this playful and comedy
                animation, Rebecca, a young farmer, decided to plant radishes for the first time,
                but there is a big twist!
              </p>
              <h3 className="section-heading">Flora</h3>
              <p className="section-text">
                A heartwarming story about a little orphan girl who tries to find her way back home.
              </p>
              <p className="section-text">
                <Link to={'/work'}>
                  <ArrowRightIcon id="bouncing-arrow" />
                </Link>
              </p>
            </div>
          </section>

          <div className="third-move section-margin"></div>

          <section className="third-section section left">
            <div className="progress-wrapper progress-bar-wrapper-left">
              <div className="progress-bar green-background"></div>
            </div>

            <div className="section-intro-wrapper green-text green-border">
              <h1 className="section-title green-text green-border">
                <span className="section-title-text green-text">Contact Me</span>
                <div className="section-title-decoration styleOne green-border"></div>
                <div className="section-title-decoration styleTwo green-border"></div>
                <div className="section-title-decoration styleThree green-background green-border"></div>
              </h1>
              <span className="section-number green-text">03</span>
            </div>

            <div className="section-detail-wrapper">
              <h3 className="section-heading">ArtStation</h3>
              <p className="section-text">
                I post all my work here. I don't want to link it yet because I want to sort it out a
                little bit!
              </p>
              <h3 className="section-heading">Instagram</h3>
              <p className="section-text">
                Check out my personal instagram for travel pics and food and stuff.
              </p>
              <h3 className="section-heading">LinkedIn</h3>
              <p className="section-text">Career updates and so much more!</p>
              <p className="section-text">
                <Link to={'/contact'}>
                  <ArrowRightIcon id="bouncing-arrow" />
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;

import './Timer.css';    
import First from './Images/codingmonkey.gif';
import Second from './Images/secondAnimation.gif';
import Third from './Images/thirdAnimation.gif';
import Fouth from './Images/Fourth.gif';
import Fifth from './Images/Fifth.gif'; 
import Break from './Images/breakAnimation.gif';
import Break2 from './Images/break2.gif';
import Break3 from './Images/break3.gif';
import Break4 from './Images/break4.gif';
import Break5 from './Images/break5.gif';
import { useState, useEffect } from 'react';

import timeOverSound from './Assets/lastSound.mp3';
import Victory from './Images/victory.gif';
import Logo from './Images/FinalLogo.png';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [activeimageIndex, setActiveImageIndex] = useState(0);
  const [inactiveImageIndex,setInActiveImageIndex]=useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const images =[First,Second,Third,Fouth,Fifth];
  const images1 =[Break,Break2,Break3,Break4,Break5];
  
  useEffect(() => {
    let interval;

    if (isActive) {
      

      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            setShowVictory(true)
            playTimeOverSound();
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
        if (seconds % 10 === 0) {
            setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          }
      }, 1000);
    } else {
      
      clearInterval(interval);
      if(seconds%5===0){
        setTimeout(() => {
            setInActiveImageIndex((prevIndex) => (prevIndex + 1) % images1.length);
          }, 5000);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds,images]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setShowVictory(false);
  };
  const playTimeOverSound = () =>{
    const audio =new Audio(timeOverSound);
    audio.play();
  }
  const handleLogoClick = () => {
    window.location.reload();
  };
 
  return (
    <>
    <div className="logo" onClick={handleLogoClick}><img src={Logo} alt="" /></div>
    <div className="MainBox" >
      <div className="leftAnimation">
      {showVictory ? <img src={Victory} alt="Victory" /> :
          (isActive ? <img src={images[activeimageIndex]} alt="" /> : <img src={images1[inactiveImageIndex]} alt="" />)
        }
        
        </div>
      <div className="rightTimer">
        <h1>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</h1>
        <div className="buttons">
          <button onClick={handleStartPause}>{isActive ? 'Pause' : 'Start'}</button>
          <button onClick={handleReset}>Reset</button>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default Timer;

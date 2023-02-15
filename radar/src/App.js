import { useEffect, useRef, useState } from 'react';
import './App.css';
import Data from './Data';

function App() {

  const frame = useRef();
  const target = useRef();
  const rocket = useRef();
  const explosionImg = useRef();
  const [positionX, setPositionX] = useState(-160);
  const [positionY, setPositionY] = useState(100);
  const [targetVelocity, setTargetVelocity] = useState(5);
  const [rocketVelocity, setRocketVelocity] = useState(5);
  const [rocketY, setRocketY] = useState(0);
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const [simFinished, setSimFinished] = useState(false);
  const [simStarted, setSimStarted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [targetHeading, setTargetHeadeing] = useState(90 - rotation);


  const updateRotation = () => {
    const radian = Math.atan((frame.current.clientHeight - positionY - 240) / (frame.current.clientWidth - positionX - 80));
    const deg = radian * (180 / Math.PI);
    if (deg < 80 && deg > 0) setRotation(75 - deg);
    else setRotation(60);
  }

  let posXInterval;
  const moveTarget = () => {
    posXInterval = setInterval(() => {
      setPositionX(prev => prev + targetVelocity);
    }, 100);
  }
  
  let rockYInterval;
  const moveRocket = () => {
    rockYInterval = setInterval(() => {
      setRocketY(prev => prev - rocketVelocity);
    }, 100);
  }
  
  const launchTheRocket = () => {
    setRocketLaunched(true);
    moveRocket();
    if (rocketVelocity > 30) setTimeout(() => {
      target.current.style.display = "none";
      setSimFinished(true);
      setSimStarted(true);
    }, 750);
    else setTimeout(() => {
      target.current.style.display = "none";
      setSimFinished(true);
      setSimStarted(true);
    }, 900);
    const radian = 3 * Math.sin(Number((90 - rotation).toFixed(2)));
    const number = Math.abs(radian);
    const decimal = number - Math.floor(number);
    setTargetHeadeing(Math.asin(decimal) * (180 / Math.PI));
  }

  const startSimulation = (e) => {
    e.target.style.display = "none";

    let targetPositionY = Math.floor(Math.random() * 300);
    if (targetPositionY < 30) targetPositionY = 30;

    if (targetVelocity === rocketVelocity) setPositionY(targetPositionY);
    else setPositionY(frame.current.clientHeight - 290);

    setSimStarted(true);
    setSimFinished(false);
    moveTarget();
  }
  
  useEffect(() => {
    let targetPositionX = frame.current.clientWidth - positionX - 80;
    if (!rocketLaunched) updateRotation();
    if (targetVelocity > 26 && (targetPositionX < 1100)) launchTheRocket();
    if (targetVelocity < 26 && targetPositionX < 900) launchTheRocket();
  }, [positionX]);
  
  useEffect(() => {
    let velocity = Math.floor(Math.random() * 50);
    if (velocity < 20) velocity = 20;
    setTargetVelocity(velocity);
    setRocketVelocity(velocity);
  }, []);
  
  return (
    <>
      <Data targetVelocity={targetVelocity} rotation={rotation} simFinished={simFinished} simStarted={simStarted} rocketVelocity={rocketVelocity} setRocketVelocity={setRocketVelocity} setPositionY={setPositionY} targetHeading={targetHeading} />
      <div ref={frame} className="frame">
        <img ref={explosionImg} src='/assets/explo.gif' alt='Explosion' />
        <button className='start-btn' onClick={startSimulation}>Start Simulation</button>
        <div ref={target} className='target' style={{ right: `${positionX}px`, top: `${positionY}px` }}>
          { frame.current ? `${frame.current.clientHeight - positionY - 240}m` : ""}
        </div>
        <div className='ground-container'>
          <div className='radar'>
            <div className='radar-base'></div>
            <div className='rocket-holder' style={{ transform: `rotate(${rotation}deg)` }}>
              <div className='radar-line' style={{ height: frame.current ? `${frame.current.clientHeight - positionY - 240}px` : "400px" }} data-rotation={(90 - rotation).toFixed(3)}></div>
              <div ref={rocket} className='rocket' style={{ top: rocketLaunched ? `${rocketY}px` : "10px" }}></div>
            </div>
          </div>
        </div>
        </div>
      </>
  );
}

export default App;




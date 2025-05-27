import React, { useEffect, useRef, useState } from 'react'
import styles from "./Home.module.css";
import '../../../globals.css';
import GlassCard from '../../components/GlassCard';

// Ball info
const BALL_RADIUS = 0.075; // metres
const VOLUME = (4/3) * Math.PI * (BALL_RADIUS ** 3)
const METER_FACTOR = 1000;
const DIAMETER_PX = BALL_RADIUS * 2 * METER_FACTOR;
const BALL_AREA = Math.PI * (BALL_RADIUS ** 2);
const BALL_MASS = 1.5;

// Gravity
const GRAVITY = 9.0;

// Bouyancy
const FLUID_DENSITY = 1000;

// Drag
const AIR_DENSITY = 1.225;
const DRAG_COEFFICIENT = 0.5;


function Home() {
  const AIR_HEIGHT = (window.innerHeight * 0.7)
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [velocity, setVelocity] = useState<number>(0);
  const [percentSubmerged, setPercentSubmerged] = useState(0);

  // refs
  const xRef = useRef(x);
  const yRef = useRef(y);
  const velocityRef = useRef(velocity);

  // update refs
  useEffect(() => {
    yRef.current = y;
    // change submerged percentage
    if (yRef.current + DIAMETER_PX >= AIR_HEIGHT) {
      const heightSubmerged = Math.min(
        DIAMETER_PX,
        yRef.current + DIAMETER_PX - AIR_HEIGHT
      );
      const percent = Math.abs(heightSubmerged / DIAMETER_PX) * 100;
      setPercentSubmerged(percent);
    } else {
      setPercentSubmerged(0);
    }
  }, [y]);
  useEffect(() => { xRef.current = x; }, [x]);
  useEffect(() => { velocityRef.current = velocity; }, [velocity]);

  // physics
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      if (!dragging) {
        const DELTA_TIME = 0.16;
        const isSubmerged = (yRef.current + (BALL_RADIUS * METER_FACTOR * 2)) >= AIR_HEIGHT;

        const forceGravity = BALL_MASS * GRAVITY;
        const buoyantForce = FLUID_DENSITY * GRAVITY * VOLUME;
        const dragForce = -0.5 * AIR_DENSITY * DRAG_COEFFICIENT * BALL_AREA * velocityRef.current * Math.abs(velocityRef.current);
        const netForce = forceGravity - (isSubmerged ? buoyantForce : 0) + dragForce;
        const acceleration = netForce / BALL_MASS;

        setVelocity(prev => prev + acceleration * DELTA_TIME);
        setY((prev) => {
          const newPos = prev + (velocityRef.current * DELTA_TIME);
          return newPos;
        });

        animationId = requestAnimationFrame(animate);
      }
    }
    animate();

    return () => cancelAnimationFrame(animationId);
  }, [dragging])

  useEffect(() => {
    const dragHandler = (event) => {
      if (dragging) {
        const xPos = event.clientX - (BALL_RADIUS * METER_FACTOR);
        const yPos = event.clientY - (BALL_RADIUS * METER_FACTOR);
        if (xPos >= 0 && xPos < window.innerWidth - ((BALL_RADIUS * METER_FACTOR) * 2)) setX(xPos);
        if (yPos >= 0 && yPos < window.innerHeight - ((BALL_RADIUS * METER_FACTOR) * 2)) setY(yPos);
      }
    }
    window.addEventListener("mousemove", dragHandler);
    return () => window.removeEventListener("mousemove", dragHandler);
  }, [dragging])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className="text-5xl font-extrabold mb-3" style={{fontFamily: "Munro Small"}}>Hello! I'm Andrei.</h1>
          <p className="text-lg text-gray-600">Welcome to my profile</p>
        </div>
        <GlassCard/>
        <div style={jsStyles.ballContainer}>
          <div
            onMouseDown={() => setDragging(true)}
            onMouseUp={() => setDragging(false)}
            style={{
              ...jsStyles.ball,
              backgroundImage: `linear-gradient(to bottom, #1d1d1d ${100 - percentSubmerged}%, white ${100 - percentSubmerged}%)`,
              top: `${y}px`,
              left: `${x}px`,
            }}
          >
            DRAG ME
          </div>
        </div>
        <div className={styles.secretText}>Shhh nothing to see here...</div>
      </div>
    </>
  )
}

const jsStyles: Record<string, React.CSSProperties> = {
  ball: {
    height: `${BALL_RADIUS * 2 * METER_FACTOR}px`,
    width: `${BALL_RADIUS * 2 * METER_FACTOR}px`,
    backgroundColor: "black",
    borderRadius: "100%",
    position: "absolute",
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    color: '#ffffff',
    userSelect: 'none',
    fontWeight: 'bold'
  },

  ballContainer: {
    backgroundColor: 'transparent',
    height: '100vh',
    width: '100vw',
    transformOrigin: "center",
  },
}

export default Home

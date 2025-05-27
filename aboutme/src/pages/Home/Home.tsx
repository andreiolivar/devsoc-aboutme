import React, { useEffect, useRef, useState } from 'react'

// Ball info
const BALL_RADIUS = 0.075; // metres
const VOLUME = (4/3) * Math.PI * (BALL_RADIUS ** 3)
const METER_FACTOR = 1000;
const DIAMETER_PX = BALL_RADIUS * 2 * METER_FACTOR;
const BALL_AREA = Math.PI * (BALL_RADIUS ** 2);
const BALL_MASS = 1.5;
const SUN_COLOR = "#dcf9f5";
const MOON_COLOR = "#ffb32c";

// Gravity
const GRAVITY = 9.0;

// Bouyancy
const FLUID_DENSITY = 1000;

// Drag
const AIR_DENSITY = 1.225;
const DRAG_COEFFICIENT = 0.5;


function Home() {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [bgColor, setBgColor] = useState<typeof SUN_COLOR | typeof MOON_COLOR>("white");
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
    if (yRef.current + DIAMETER_PX >= (window.innerHeight / 2)) {
      const heightSubmerged = Math.min(
        DIAMETER_PX,
        yRef.current + DIAMETER_PX - (window.innerHeight / 2)
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
        const isSubmerged = (yRef.current + (BALL_RADIUS * METER_FACTOR * 2)) >= (window.innerHeight / 2);

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
    <div style={styles.container}>
      <div
        style={styles.ballContainer}
      >
        <div
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          style={{
            ...styles.ball,
            backgroundColor: `${bgColor}`,
            backgroundImage: `linear-gradient(to bottom, white ${100 - percentSubmerged}%, black ${100 - percentSubmerged}%)`,
            top: `${y}px`,
            left: `${x}px`
          }}
        />
      </div>
      <div>This is the home page!</div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#022730',
    backgroundImage: 'linear-gradient(black 50%, white 50%)',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  ballContainer: {
    backgroundColor: 'transparent',
    height: '100vh',
    width: '100vw',
    transformOrigin: "center",
  },

  ball: {
    width: `${BALL_RADIUS * 2 * METER_FACTOR}px`,
    height: `${(BALL_RADIUS * 2 * METER_FACTOR)}px`,
    backgroundColor: '#dcf9f5',
    borderRadius: "100%",
    position: 'absolute',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default Home

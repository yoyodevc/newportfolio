import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#1a202c",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#FFFFFF",
        },
        links: {
          color: "#666666",
          distance: 200,
          enable: true,
          opacity: 0.1,
          width: 2,
        },
        move: {
          direction: "bottom", 
          enable: true,
          outModes: {
            default: "out", 
          },
          random: false, 
          speed: 1,
          straight: false, 
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.7,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 1 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <Particles
      id={props.id}
      className={`${props.className} -z-20`}
      init={particlesLoaded}
      options={options}
    />
  );
};

export default ParticlesComponent;

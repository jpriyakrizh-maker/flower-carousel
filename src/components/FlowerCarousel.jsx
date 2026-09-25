import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import flowers from "../data/flowers";
import FlowerCard from "./FlowerCard";

function FlowerCarousel() {
  const carouselRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const [active, setActive] = useState(3);

  /* =========================
     3D CAROUSEL
  ========================= */

  const updateCarousel = (index) => {
    setActive(index);

    if (!carouselRef.current) return;

    const cards = carouselRef.current.children;

    Array.from(cards).forEach((card, i) => {
      let offset = i - index;

      /* Circular positioning */
      if (offset > 3) {
        offset -= flowers.length;
      }

      if (offset < -3) {
        offset += flowers.length;
      }

      const distance = Math.abs(offset);

      gsap.to(card, {
        /* Curved horizontal spacing */
        x: offset * 220,

        /* 3D depth */
        z: -distance * 135,

        /* Curved perspective */
        rotateY: offset * -22,

        /* Center flower larger */
        scale: offset === 0 ? 1 : 0.70,

        /* Hide far flowers */
        opacity: distance > 2 ? 0 : 1,

        duration: 0.8,

        ease: "power3.out",

        overwrite: true,
      });
    });
  };

  /* =========================
     INITIAL POSITION ONLY
     NO AUTO ROTATION
  ========================= */

  useEffect(() => {
    updateCarousel(3);
  }, []);

  /* =========================
     NEXT
  ========================= */

  const nextFlower = () => {
    const next =
      (active + 1) % flowers.length;

    updateCarousel(next);
  };

  /* =========================
     PREVIOUS
  ========================= */

  const previousFlower = () => {
    const previous =
      (active - 1 + flowers.length) %
      flowers.length;

    updateCarousel(previous);
  };

  /* =========================
     POINTER DOWN
  ========================= */

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  /* =========================
     POINTER UP
  ========================= */

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;

    isDragging.current = false;

    const difference =
      e.clientX - startX.current;

    if (difference > 60) {
      previousFlower();
    }

    if (difference < -60) {
      nextFlower();
    }
  };

  /* =========================
     POINTER CANCEL
  ========================= */

  const handlePointerCancel = () => {
    isDragging.current = false;
  };

  /* =========================
     DESCRIPTION SIDE
  ========================= */

  const isLeft = active % 2 === 0;

  const descriptionSide = isLeft
    ? "description-left"
    : "description-right";

  return (
    <section className="flower-section">

      {/* =========================
          HEADER
      ========================= */}

      <div className="heading">
     <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          Aesthetic Flowers
        </motion.h1>

      </div>

      {/* =========================
          3D CAROUSEL
      ========================= */}

      <div
        className="carousel-wrapper"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >

        <div
          className="carousel"
          ref={carouselRef}
        >

          {flowers.map((flower, index) => (
            <FlowerCard
              key={flower.id}
              flower={flower}
              active={active === index}
              onClick={() =>
                updateCarousel(index)
              }
            />
          ))}

        </div>

      </div>

      {/* =========================
          DESCRIPTION CARD
      ========================= */}

      <motion.div
        className={`description-card ${descriptionSide}`}
        key={flowers[active].id}

        initial={{
          opacity: 0,
          x: isLeft ? -40 : 40,
        }}

        animate={{
          opacity: 1,
          x: 0,
        }}

        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}

        whileHover={{
          y: -6,
          scale: 1.03,
        }}
      >

        <span className="description-number">
          0{flowers[active].id}
        </span>

        <span className="description-label">
          BOTANICAL COLLECTION
        </span>

        <h2>
          {flowers[active].name}
        </h2>

        <div className="description-line" />

        <p>
          A delicate botanical form inspired
          by natural beauty, softness and
          timeless elegance.
        </p>

        <div className="description-bottom">

          <span>
            DISCOVER
          </span>

          <span>
            →
          </span>

        </div>

      </motion.div>

      {/* =========================
          CONTROLS
      ========================= */}

      <div className="controls">

        <button onClick={previousFlower}>
          ←
        </button>

        <span>
          0{active + 1} / 0{flowers.length}
        </span>

        <button onClick={nextFlower}>
          →
        </button>

      </div>

    </section>
  );
}

export default FlowerCarousel;

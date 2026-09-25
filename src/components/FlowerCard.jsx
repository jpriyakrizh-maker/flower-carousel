import { motion } from "framer-motion";

function FlowerCard({ flower, active, onClick }) {
  return (
    <motion.div
      className={`flower-card ${active ? "active" : ""}`}
      onClick={onClick}
      whileHover={{
        y: -10,
        scale: active ? 1.05 : 0.75,
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="flower-glow"
        animate={{
          scale: active ? 1.2 : 0.85,
          opacity: active ? 0.8 : 0.3,
        }}
        transition={{
          duration: 0.5,
        }}
      />

      <motion.img
        src={flower.image}
        alt={flower.name}
        draggable="false"
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: active ? 1 : 0.7,
          scale: active ? 1 : 0.9,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}

export default FlowerCard;

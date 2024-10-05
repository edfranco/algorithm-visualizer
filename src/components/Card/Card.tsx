import { motion } from "framer-motion";

interface CardProps {
  num: number | null;
  index: number | null;
  currentIndex: number | null;
  compareIndex: number | null;
  isFinished: boolean;
}

export function Card({
  num,
  index,
  currentIndex,
  compareIndex,
  isFinished,
}: CardProps) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.5 }}
      className={`card relative flex flex-col justify-center w-24 h-24 mx-1 border text-center
          ${
            index === currentIndex
              ? "bg-red-400"
              : index === compareIndex
                ? "bg-yellow-400"
                : "bg-blue-400"
          }
          ${index! < currentIndex! || isFinished ? "bg-green-300" : ""}
      `}
    >
      {num}
    </motion.div>
  );
}

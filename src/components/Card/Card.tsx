import { motion } from 'framer-motion';

interface CardProps {
    bound: number | null;
    currentAlgorithm: string | null;
    currentIndex: number | null;
    compareIndex: number | null;
    index: number | null;
    isFinished: boolean;
    num: number | null;
}

export function Card({
    bound,
    index,
    currentAlgorithm,
    currentIndex,
    compareIndex,
    isFinished,
    num
}: CardProps) {
    const getSortedStyles = () => {
        switch(currentAlgorithm) {
            case 'bubble': {
                return (bound! !== null && index! >= bound!) || isFinished ? 'bg-green-300' : ''
            }
            case 'selection': {
                return index! < currentIndex! || isFinished ? '!bg-green-300' : ''
            }
        }
    }
    return (
        <motion.div
            layout
            transition={{ duration: 0.5 }}
            className={`card relative flex flex-col justify-center w-24 h-24 mx-1 border text-center ${
              index === currentIndex && !isFinished
                  ? 'bg-red-400'
                  : index === compareIndex
                    ? 'bg-yellow-400'
                    : 'bg-blue-400'
          } ${getSortedStyles()}`
        }
        >
            {num}
        </motion.div>
    );
}

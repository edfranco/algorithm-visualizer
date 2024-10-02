interface CardProps {
  num: number;
}

export default function Card({ num }: CardProps) {
  return (
    <div
          key={num}
          className={`card flex flex-col justify-center w-1/2 h-36 mx-1 border bg-blue-400 text-center align-middle ${isCurrent ? 'bg-green-400' : ''} ${isCompared ? 'bg-red-400' : ''}`}
          style={{ transition: 'all 0.3s ease' }} // Smooth transition for the reordering
        >
          {num}
        </div>
  );
}

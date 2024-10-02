import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './output.css'

function shuffle(array: Array<number>) {
  var i = array.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

const numArray: Array<number> = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

function App() {
  const [cardsArr, setCardsArr] = useState<number[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number | null>(null); // Index of the current card
  const [compareIdx, setCompareIdx] = useState<number | null>(null); // Index of the compared card
  const [bound, setBound] = useState<number | null>(null);
  const [description, setDescription] = useState<string | null>('');
  let [steps, setSteps] = useState<number>(0);
  let [displaySteps, setDisplaySteps] = useState<boolean>(false);

  useEffect(() => {
    setCardsArr([...numArray]);
  }, []);

  const renderCards = (arr: Array<number>) => {
    return arr.map((num, idx) => {
      return (
        <motion.div
          key={num}
          className={`card relative flex flex-col justify-center w-1/2 h-36 mx-1 border ${
            idx=== currentIdx
              ? 'bg-red-400' // Highlight the current card being compared
              : idx=== compareIdx
              ? 'bg-yellow-400' // Highlight the card being compared to
              : 'bg-blue-400'
          }
          ${bound !== null && idx >= bound || displaySteps ? 'bg-green-300' : ''} 
          text-center align-middle`}
          layout // Automatically animates position changes
        >
          {num}
        </motion.div>
      );
    });
  };

  const handleShuffle = () => {
    setCardsArr([...shuffle([...numArray])]); // Ensure array is passed by value, not reference
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSort = async () => {
    let arrCopy = [...cardsArr];
    let n = arrCopy.length;
  
    // Flag to track whether any swaps were made
    let swapped = true;
  
    // Reduce the bound after each full pass
    while (swapped) {
      swapped = false; // Reset swapped flag at the beginning of each pass
  
      // Traverse the array from the start up to the current boundary
      for (let j = 0; j < n - 1; j++) {
        setCurrentIdx(j); // Highlight the current card
        setCompareIdx(j + 1); // Highlight the compared card
        setSteps((prevSteps) => prevSteps + 1);
        if (arrCopy[j] > arrCopy[j + 1]) {
          // Swap the elements if they are out of order
          setDescription(`${arrCopy[j]} is larger than ${arrCopy[j+1]} so we are swapping ${arrCopy[j]} for ${arrCopy[j+1]}`)
          let temp = arrCopy[j];
          arrCopy[j] = arrCopy[j + 1];
          arrCopy[j + 1] = temp;
  
          // Set the swapped flag to true since a swap occurred
          swapped = true;
  
          // Update the cardsArr state and wait for a short time
          setCardsArr([...arrCopy]);
          await delay(1000); // 500ms delay between swaps for visualization
        } else {
          setDescription(`${arrCopy[j]} is smaller than ${arrCopy[j+1]} so we do nothing`)
        }
  
        await delay(1000); // Add delay for comparisons without swaps
      }
  
      n--; // Reduce the boundary as the last element is in the correct position
      setBound(n);
    }
  
    // Final reset when sorting completes
    setCurrentIdx(null);
    setCompareIdx(null);
    setDescription(`Array is now sorted`)
    setDisplaySteps(true);
  };
  

  return (
    <>
      <div className="w-screen flex flex-col justify-center items-center text-white font-extrabold text-3xl">
        <h1>Algorithms Training</h1>
        <h2>Bubble Sort</h2>
        <p>Bubble sort repeatedly compares and swaps adjacent elements, moving the largest unsorted elements to their correct positions iteratively.</p>
        <div className="container flex justify-center items-center my-24">
          {renderCards(cardsArr)} 
          {displaySteps && <p className='absolute right-28 bottom-56 text-xs'>Finished in {steps} steps</p>}
        </div>
        <p>{description}</p>
        <div onClick={handleSort} className="button border w-[50vw] py-6 text-center hover:cursor-pointer">
          Sort
        </div>
        <div onClick={handleShuffle} className="button border w-[50vw] py-6 text-center hover:cursor-pointer">
          Shuffle
        </div>
      </div>
    </>
  );
}

export default App;

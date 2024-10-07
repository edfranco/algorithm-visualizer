import { useEffect, useState } from 'react';
import { Card } from '../../components/Card/Card';
import { getUnsortedArray, delay } from '../../functions/functions';

interface AlgorithmProps {
    name: string;
}

export function Algorithm({ name }: AlgorithmProps) {
  const [bound, setBound] = useState<number | null>(null);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<string| null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [compareIndex, setCompareIndex] = useState<number | null>(null);
  const [isFinished, setFinished] = useState<boolean>(false);
  const [numArray, setNumArray] = useState<number[]>([]);

    useEffect(() => {
        setNumArray(getUnsortedArray());
    }, []);

    const bubbleSort = async (arr: Array<number>) => {
      let swapped = true;
      let bound = arr.length - 1;
      setFinished(false);
      setCurrentAlgorithm('bubble');
      while(swapped) {
        swapped = false;
        for(let i=0; i < bound; i++) {
          setCurrentIndex(i);
          setCompareIndex(i+1);
          await delay(500)
        }
      }
      setFinished(true);
    }

    const selectionSort = async (arr: Array<number>) => {
        setFinished(false);
        setCurrentAlgorithm('selection');
        for (let i = 0; i < arr.length; i++) {
            setCurrentIndex(i);
            for (let j = i + 1; j < arr.length; j++) {
                setCompareIndex(j);
                await delay(500);
                if (arr[i] > arr[j]) {
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    setNumArray([...arr]);
                    await delay(500);
                }
            }
        }
        setFinished(true);
    };

    const renderDescription = () => {
        switch (name) {
            case 'bubble':
                return 'Bubble sort repeatedly compares and swaps adjacent elements, moving the largest unsorted elements to their correct positions iteratively.';
            case 'selection':
                return 'Selection sort repeatedly selects the smallest unsorted element and swaps it with the first unsorted element, iteratively.';
        }
    };

    const renderCards = (arr: Array<number>) => {
        return arr.map((num, index) => {
            return (
                <Card
                    num={num}
                    key={num}
                    index={index}
                    bound={bound}
                    currentAlgorithm={currentAlgorithm}
                    currentIndex={currentIndex}
                    compareIndex={compareIndex}
                    isFinished={isFinished}
                />
            );
        });
    };

    const handleSort = () => {
        switch(name) {
          case 'bubble':
            return bubbleSort([...numArray]);
          case 'selection':
            return selectionSort([...numArray])
        };
    };

    const handleShuffle = () => {
        setCurrentIndex(null);
        setCompareIndex(null);
        setFinished(false);
        setNumArray([...getUnsortedArray()]);
    };

    return (
        <div className="algorithm-container mt-4 mb-12 flex flex-col justify-center items-center">
            <h2 className="capitalize mb-8 text-xl font-bold">{name} Sort</h2>
            <div className="flex justify-center items-center">
                {renderCards(numArray)}
            </div>
            <div className="flex my-12">
                <button
                    onClick={handleSort}
                    className="bg-sky-700 border w-36 h-12 mx-3 text-sm text-center hover:cursor-pointer"
                >
                    Sort
                </button>
                <button
                    onClick={handleShuffle}
                    className="bg-sky-700 border w-36 h-12 mx-3 text-sm text-center hover:cursor-pointer"
                >
                    Shuffle
                </button>
            </div>
            <p>{renderDescription()}</p>
        </div>
    );
}

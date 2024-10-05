import { useEffect, useState } from 'react';
import { Card } from '../../components/Card/Card';
import { getUnsortedArray, delay } from '../../functions/functions';

interface AlgorithmProps {
    name: string;
}

export function Algorithm({ name }: AlgorithmProps) {
    const [numArray, setNumArray] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [compareIndex, setCompareIndex] = useState<number | null>(null);
    const [isFinished, setFinished] = useState<boolean>(false);

    useEffect(() => {
        setNumArray(getUnsortedArray());
    }, []);

    const selectionSort = async (arr: Array<number>) => {
        setFinished(false);
        for (let i = 0; i < arr.length; i++) {
            setCurrentIndex(i);
            for (let j = i + 1; j < arr.length; j++) {
                setCompareIndex(j);
                await delay(1000);
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

    const renderDescription = (algorithmName: string) => {
        switch (algorithmName) {
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
                    currentIndex={currentIndex}
                    compareIndex={compareIndex}
                    isFinished={isFinished}
                />
            );
        });
    };

    const handleSort = () => {
        selectionSort([...numArray]);
    };

    const handleShuffle = () => {
        setCurrentIndex(null);
        setCompareIndex(null);
        setFinished(false);
        setNumArray([...getUnsortedArray()]);
    };

    return (
        <div className="algorithm-container flex flex-col justify-center items-center">
            <h2 className="capitalize">{name} Sort</h2>
            <div className="flex justify-center items-center my-24">
                {renderCards(numArray)}
            </div>
            <div className="flex">
                <button
                    onClick={handleSort}
                    className="button border w-36 h-12 text-sm text-center hover:cursor-pointer"
                >
                    Sort
                </button>
                <button
                    onClick={handleShuffle}
                    className="button border w-36 h-12 text-sm text-center hover:cursor-pointer"
                >
                    Shuffle
                </button>
            </div>
            <p>{renderDescription(name)}</p>
        </div>
    );
}

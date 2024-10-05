import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Algorithm } from "./containers/AlgorithmContainer/AlgorithmContainer";
import "./output.css";

function App() {
  return (
    <div className='w-screen flex flex-col justify-center items-center text-white font-extrabold text-3xl'>
      <h1 className='text-center'>Algorithms Visualization</h1>
      <Algorithm name='selection' />
    </div>
  );
}

export default App;

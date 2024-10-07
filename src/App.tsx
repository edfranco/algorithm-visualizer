import { Algorithm } from './containers/AlgorithmContainer/AlgorithmContainer';
import './output.css';

function App() {
    return (
        <div className="bg-neutral-900 w-screen flex flex-col justify-center items-center text-white">
            <h1 className="text-center text-3xl mt-6 mb-4 font-extrabold">Algorithms Visualization</h1>
            <Algorithm name="bubble" />
            <Algorithm name="selection" />
        </div>
    );
}

export default App;

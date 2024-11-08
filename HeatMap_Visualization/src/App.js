import React, { useState } from 'react';
import HeatCube from './HeatCube';

const App = () => {
  const [size, setSize] = useState(10);
  const [alpha, setAlpha] = useState(0.01);
  const [iterations, setIterations] = useState(100);

  return (
    <div>
      <h1>3D Heat Conduction Visualizer</h1>
      <div>
        <label>
          Size:
          <input type="number" value={size} onChange={(e) => setSize(parseInt(e.target.value))} />
        </label>
        <label>
          Alpha:
          <input type="number" step="0.01" value={alpha} onChange={(e) => setAlpha(parseFloat(e.target.value))} />
        </label>
        <label>
          Iterations:
          <input type="number" value={iterations} onChange={(e) => setIterations(parseInt(e.target.value))} />
        </label>
      </div>
      <HeatCube size={size} alpha={alpha} iterations={iterations} />
    </div>
  );
};

export default App;

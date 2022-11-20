import React, { useState } from 'react'
import './App.css'
import AppRouter from './router/router'
import { Graph } from '../../src/graph/graphFoodWeb'

const defaultGraph = new Graph(100);
defaultGraph.seeder();
export const GraphContext = React.createContext();

function App() {
  return (
    <div className="App">
      <GraphContext.Provider value={defaultGraph}>
        <AppRouter />
      </GraphContext.Provider>
    </div>
  )
}

export default App

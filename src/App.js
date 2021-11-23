import React, { useReducer, createContext } from 'react';
import Playground from './components/Playground/Playground';
import Display from './components/Display/Display';

import './App.css';

export const CodeContext = createContext();

const initialState = {
  "html": "",
  "css": "",
  "js": ""
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'saveHtml':
      return { ...state, "html": action.code }
    case 'saveCss':
      return { ...state, "css": action.code }
    case 'saveJs':
      return { ...state, "js": action.code }
    default:
      return state;
  }
}

function App() {
  const [code, dispatch] = useReducer(reducer, initialState)

  return (
    <CodeContext.Provider value={{ code, dispatchCode: dispatch }}>
      <div className="App">
        <Playground />
        <Display />
      </div>
    </CodeContext.Provider>
  );
}

export default App;
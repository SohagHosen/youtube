import React, { createContext, useEffect, useReducer } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { recomandedVideoApi } from "../api/api";
import { initialState, reducer } from "../state/state";
import "./App.css";
import Appbar from "./appbar/Appbar";
import RecomandedVideos from "./recomandedVideos/LoadingSkeleton";
export const AppContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(()=>{
  recomandedVideoApi().then((result) => {
    dispatch({ type: "FATCHING_VIDOES", value: [...result.items] });
  });
    
  },[])
  return (
    <AppContext.Provider value={[state, dispatch]}>
      <Router>
        <Appbar />
        <RecomandedVideos />
      </Router>
    </AppContext.Provider>
  );
}

export default App;

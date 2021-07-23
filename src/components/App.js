import ThemeProvider from "@material-ui/styles/ThemeProvider";
import React, { createContext, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { recomandedVideoApi } from "../api/api";
import { initialState, reducer } from "../state/state";
import "./App.css";
import Appbar from "./appbar/Appbar";
import RecomandedVideos from './recomandedVideos/RecmandedVideos';
import VideoDetails from "./videoDetails/VideoDetails";
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
      <ThemeProvider theme={state.theme}>
        <Router>
          <Appbar />
          <Route exact path="/" component={RecomandedVideos}/>
          <Route exact path="/watch/:id" component={VideoDetails} />
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;

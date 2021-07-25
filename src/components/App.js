import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import React, { createContext, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { recomandedVideoApi } from "../api/api";
import { initialState, reducer } from "../state/state";
import AppBar from "./appbar/Appbar";
import RecomandedVideos from './recomandedVideos/RecmandedVideos';
import Search from "./search/Search";
import VideoDetails from "./videoDetails/VideoDetails";

export const AppContext = createContext();
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    height:"100vh"
    
  },
}));
function App() {
  const classes = useStyles();

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
          {state.videos.length > 0 ? (
            <>
              <AppBar />
              <Route exact path="/" component={RecomandedVideos} />
              <Route exact path="/watch/:id" component={VideoDetails} />
              <Route exact path="/search" component={Search} />
            </>
          ) : (
            <div className={classes.root}>
              <CircularProgress />
            </div>
          )}
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;

import { makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../App";
import SearchCards from "./SearchCards";
const Search = () => {
  const [state] = useContext(AppContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "4rem",
      paddingTop: "1rem",
      color: state.theme.palette.primary.contrastText,
      backgroundColor: state.theme.palette.primary.dark,
      [theme.breakpoints.down("xs")]: {
        marginTop: "3rem",
        paddingTop: "2rem",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {state.searchResults.length &&
        state.searchResults.map((item, index) => (
          <SearchCards key={index} data={item} />
        ))}
    </div>
  );
};

export default Search;

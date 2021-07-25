import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { AppContext } from "../App";
import SearchCards from "./SearchCards";
const Search = () => {
  const [state] = useContext(AppContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "4rem",
      paddingTop: "1rem",
      color: state.theme.palette.primary.contrastText,

      [theme.breakpoints.down("xs")]: {
        marginTop: "3rem",
        paddingTop: "2rem",
      },
    },
    notfound: {
      marginTop: "3rem",
      paddingTop: "2rem",
      color: state.theme.palette.primary.contrastText,
    },
    searchContainer: {
      backgroundColor: state.theme.palette.primary.dark,
      height: state.searchResults.length ? "" : "calc(100vh - 48px)",
      width: "100%",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.searchContainer}>
      {state.searchResults.length === 0 ? (
        <div className={classes.notfound}>Result not found!</div>
      ) : (
        <div className={classes.root}>
          {state.searchResults.length &&
            state.searchResults.map((item, index) => (
              <SearchCards key={index} data={item} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;

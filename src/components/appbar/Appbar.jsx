import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { searchVideos } from "../../api/api";
import darkLogo from "../../assets/logos/yt_logo_rgb_dark.png";
import lightLogo from "../../assets/logos/yt_logo_rgb_light.png";
import { AppContext } from "../App";

export default function Appbar() {
  let history = useHistory();

  const [state, dispatch] = useContext(AppContext);
  const [darkTheme, setDarkTheme] = useState(true);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
    },
    logo: {
      height: "20px",
    },
    appbar: {
      backgroundColor: state.theme.palette.primary.main,
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    menuTitle: {
      marginRight: theme.spacing(2),
      // width: "200px",
    },
    brandLink: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textDecoration: "none",
      color: "white",
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      // backgroundColor: state.theme.palette.primary.light,
      marginLeft: 0,
      width: "100%",
      maxWidth: "500px",
      color: state.theme.palette.primary.contrastText,
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      width: "100%",
      padding: theme.spacing(1, 1, 1, 5),
      border: "none",
      color: state.theme.palette.primary.gray,

      transition: theme.transitions.create("width"),
      backgroundColor: state.theme.palette.primary.light,
      [theme.breakpoints.up("sm")]: {
        width: "90%",
        "&:focus": {
          width: "100%",
        },
      },
    },
    themeHandler: {
      marginLeft: "1rem",
      color: darkTheme ? "white" : "black",
    },
  }));
  const classes = useStyles();
  const handleTheme = () => {
    setDarkTheme(!darkTheme);
    dispatch({ type: "CHANGE_THEME", value: darkTheme });
  };
  const [search, setSearch] = useState("");
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    searchVideos(search).then((result) => {
      dispatch({ type: "SEARCHING_VIDEOS", value: [...result.items] });
      history.push("/search");
    });
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.menuTitle} variant="h6">
            <Link to="/" className={classes.brandLink}>
              {darkTheme ? (
                <img className={classes.logo} src={darkLogo} alt="" />
              ) : (
                <img className={classes.logo} src={lightLogo} alt="" />
              )}
            </Link>
          </Typography>

          <div className={classes.search}>
            <form action="" onSubmit={handleSubmit}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <input
                type="search"
                className={classes.inputRoot}
                value={search}
                onChange={handleChange}
                placeholder="Search..."
              />
            </form>
          </div>
          <InvertColorsIcon
            className={classes.themeHandler}
            onClick={handleTheme}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import darkLogo from "../../assets/logos/yt_logo_rgb_dark.png";
import lightLogo from "../../assets/logos/yt_logo_rgb_light.png";
import { AppContext } from "../App";
export default function Appbar() {
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
      backgroundColor: state.theme.palette.primary.light,
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
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
      paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
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
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
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

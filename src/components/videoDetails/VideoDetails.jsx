import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import RelatedVideos from "../relatedVideos/RelatedVideos";
const VideoDetails = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "64px",
      paddingTop: "2rem",
      display: "flex",
      flexDirection: "row",
    },

    video: {
      width: "63vw",
      height: "35.2vw",
      backgroundColor: "blue",

      [theme.breakpoints.down("sm")]: {
        backgroundColor: "red",
        width: "90vw",
        height: "50vw",
      },
      [theme.breakpoints.down("xs")]: {
        position: "fixed",
        top: "95px",
      },
    },
    relatedVidoe: {
      [theme.breakpoints.down("xs")]: {
        marginTop: "55vw",
      },
    },
    relatedVideoContainer: {
      color: "white",
    },
  }));
  const classes = useStyles();
  const opts = {
    playerVars: {
      autoplay: 0,
      controls: 1,
      autohide: 1,
      origin: "http://localhost:3000",
    },
  };
  let { id } = useParams();
  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justifyContent="center"
    >
      <Grid container item md={8} spacing={3}>
        <YouTube className={classes.video} videoId={id} opts={opts} />
      </Grid>
      <Grid
        className={classes.relatedVideoContainer}
        container
        direction="row"
        justifyContent="center"
        item
        md={4}
        spacing={3}
      >
        <RelatedVideos videoId={id} />
      </Grid>
    </Grid>
  );
};

export default VideoDetails;

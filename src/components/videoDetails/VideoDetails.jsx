import { Avatar, Box, Grid, makeStyles, Typography } from "@material-ui/core";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import moment from "moment";
import numeral from "numeral";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { channelInfo, videoInfo } from "../../api/api";
import { AppContext } from "../App";
const VideoDetails = () => {
  const [state] = useContext(AppContext);
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
    videoTitle: {
      color: state.theme.palette.primary.contrastText,
      width: "100%",
      fontSize: "1.5rem",
    },
    videoInfo: {
      color: state.theme.palette.primary.gray,
      width: "100%",
    },
    dot: {
      fontSize: ".4rem",
      margin: "0px 5px",
    },
    likeSection: {
      display: "flex",
      color: state.theme.palette.primary.gray,
    },
    viewAndLikeSection: {
      display: "flex",
      justifyContent: "space-bitween",
      marginTop: "1rem",
    },
    videoAllInfo: {
      width: "63vw",
      [theme.breakpoints.down("sm")]: {
        width: "90vw",
      },
    },
    like: {
      display: "flex",
      marginRight: "1rem",
    },
    channelTitle: {
      color: "white",
      fontSize: "2rem",
      margin: "1rem 0px",
      padding: 0,
    },
    channelName: {
      display: "flex",
      gap: ".7rem",
    },
    channelSubs: {
      color: state.theme.palette.primary.gray,
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
  const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});
  useEffect(() => {
    videoInfo(id).then((result) => setVideo(result));
  }, []);
  useEffect(() => {
    if (video && video.snippet) {
      channelInfo(video.snippet.channelId).then((result) => setChannel(result));
    }
  }, [video]);
  console.log(channel);
  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justifyContent="center"
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        item
        md={8}
        spacing={3}
      >
        <YouTube className={classes.video} videoId={id} opts={opts} />
        <Box className={classes.videoAllInfo}>
          <Typography className={classes.videoTitle}>
            {video && video.snippet && video.snippet.title}
          </Typography>
          <Box className={classes.viewAndLikeSection}>
            <Typography className={classes.videoInfo}>
              {numeral(
                video && video.statistics && video.statistics.viewCount
              ).format("0.a")}
              views
              <FiberManualRecord className={classes.dot} />
              {moment(
                video && video.snippet && video.snippet.publishedAt
              ).fromNow()}
            </Typography>
            <Box className={classes.likeSection}>
              <Typography className={classes.like}>
                <ThumbUpAltIcon />
                {numeral(
                  video && video.statistics && video.statistics.likeCount
                ).format("0.a")}
              </Typography>
              <Typography className={classes.like}>
                <ThumbDownIcon />
                {numeral(
                  video && video.statistics && video.statistics.dislikeCount
                ).format("0.a")}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.channelTitle}>
            {channel.snippet && (
              <Box className={classes.channelName}>
                <Avatar
                  alt="Remy Sharp"
                  src={channel.snippet.thumbnails.default.url}
                />
                <Box>
                  <Typography>{channel.snippet.title}</Typography>
                  <Typography className={classes.channelSubs}>
                    {numeral(channel.statistics.subscriberCount).format("0.a")}{" "}
                    subscribers
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
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
        {/* <RelatedVideos videoId={id} /> */}
      </Grid>
    </Grid>
  );
};

export default VideoDetails;

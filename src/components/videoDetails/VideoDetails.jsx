import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
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
import RelatedVideos from "../relatedVideos/RelatedVideos";
const VideoDetails = () => {
  const [state] = useContext(AppContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "64px",
      paddingTop: "2rem",
      padding: "1rem",
      overflow: "hidden",
      backgroundColor: state.theme.palette.primary.dark,
    },
    videoSection: {
      width: "97%",
      margin: "auto",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    video: {
      width: "100%",
      height: "36vw",
      [theme.breakpoints.down("sm")]: {
        height: "53vw",
      },
    },
    relatedVideoContainer: {
      width: "97%",
      color: state.theme.palette.primary.contrastText,
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
    like: {
      display: "flex",
      marginRight: "1rem",
    },
    channelTitle: {
      width: "100%",
      color: state.theme.palette.primary.contrastText,

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
    videoDescription: {
      color: state.theme.palette.primary.gray,
      [theme.breakpoints.down("xs")]: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
      },
    },
    divider: {
      color: state.theme.palette.primary.gray,
      margin: "1rem 0",
      [theme.breakpoints.down("md")]: {
        display: "bloak",
      },
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    progress: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
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
  }, [id]);
  useEffect(() => {
    if (video && video.snippet) {
      channelInfo(video.snippet.channelId).then((result) => setChannel(result));
    }
  }, [video]);
  console.log(video);
  return (
    <>
      {video.snippet && channel.snippet ? (
        <Grid
          className={classes.root}
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid
            className={classes.videoContainer}
            container
            direction="column"
            justifyContent="flex-start"
            item
            md={8}
            lg={8}
            sm={12}
          >
            <Box className={classes.videoSection}>
              <Box className={classes.iframe}>
                <YouTube className={classes.video} videoId={id} opts={opts} />
              </Box>
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
                        video &&
                          video.statistics &&
                          video.statistics.dislikeCount
                      ).format("0.a")}
                    </Typography>
                  </Box>
                </Box>
                {channel.snippet && (
                  <Box
                    justifyContent="space-between"
                    className={classes.channelTitle}
                  >
                    <Box className={classes.channelName}>
                      <Avatar
                        alt="Remy Sharp"
                        src={channel.snippet.thumbnails.default.url}
                      />
                      <Box>
                        <Typography>{channel.snippet.title}</Typography>
                        <Typography className={classes.channelSubs}>
                          {numeral(channel.statistics.subscriberCount).format(
                            "0.a"
                          )}{" "}
                          subscribers
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                {channel.snippet && (
                  <Box>
                    <Typography className={classes.videoDescription}>
                      {" "}
                      {video.snippet.description}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            container
            item
            direction="row"
            justifyContent="center"
            sm={12}
            lg={4}
            md={4}
          >
            <Box className={classes.relatedVideoContainer}>
              <hr className={classes.divider} />
              <RelatedVideos videoId={id} />
            </Box>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default VideoDetails;

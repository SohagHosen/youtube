import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import moment from "moment";
import numeral from "numeral";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function VideoCards({ value }) {
  const [state] = useContext(AppContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 300,
      margin: "1rem",
      position: "relative",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    cardLink: {
      textDecoration: "none",
      color: state.theme.palette.primary.contrastText,
    },
    media: {
      height: "auto",
      width: "100%",
      display: "block",
    },
    imgContainer: {
      position: "relative",
    },
    duration: {
      position: "absolute",
      right: "10px",
      bottom: "10px",

      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "2px 5px",
      [theme.breakpoints.down("xs")]: {
        // bottom: "50vh",
      },
    },
    channelName: {
      fontSize: "0.9rem",
    },
    videoTitle: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
      padding: ".5rem",
    },
    videoInfo: {
      fontSize: "0.8rem",
    },
    videoDetails: {
      display: "block",
      color: state.theme.palette.primary.gray,
      padding: ".5rem",
    },
    dot: {
      fontSize: ".4rem",
      margin: "0px 5px",
    },
  }));
  const classes = useStyles();
  const seconds = moment
    .duration(value.contentDetails && value.contentDetails.duration)
    .asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  return (
    <>
      {value.snippet && (
        <Box className={classes.root}>
          <Link className={classes.cardLink} to={`/watch/${value.id}`}>
            <Box>
              <div className={classes.imgContainer}>
                <img
                  className={classes.media}
                  src={value.snippet.thumbnails.medium.url}
                  alt="..."
                />
                {value.contentDetails && (
                  <span className={classes.duration}>{_duration}</span>
                )}
              </div>
              <Typography
                className={classes.videoTitle}
                gutterBottom
                component="h6"
              >
                {value.snippet.title}
              </Typography>
            </Box>
          </Link>
          <Box className={classes.videoDetails}>
            <Typography className={classes.channelName}>
              {value.snippet.channelTitle}
            </Typography>
            <Typography className={classes.videoInfo}>
              {value.statistics && (
                <>
                  {numeral(value.statistics.viewCount).format("0.a")} views
                  <FiberManualRecordIcon className={classes.dot} />
                </>
              )}

              {moment(value.snippet.publishedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}

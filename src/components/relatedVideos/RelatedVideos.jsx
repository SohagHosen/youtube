import { Grid, makeStyles, Typography } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import moment from "moment";
import numeral from "numeral";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { relatedVideoApi } from "../../api/api";
import { AppContext } from "../App";
const RelatedVideos = ({ videoId }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    relatedVideoApi(videoId).then((result) => setVideos(result));
  }, [videoId]);
  const [state] = useContext(AppContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      color: state.theme.palette.primary.contrastText,
      marginBottom: "1rem",
      width: "100%",
      textDecoration: "none",
    },
    relatedVideoThumbnail: {
      width: "100%",
      height: "auto",
    },
    videoTitle: {
      width: "100%",
      fontSize: "1rem",
    },
    dot: {
      fontSize: ".4rem",
      margin: "0px 5px",
    },
    channelName: {
      color: state.theme.palette.primary.gray,
    },
    videoInfo: {
      color: state.theme.palette.primary.gray,
    },
  }));
  const classes = useStyles();
  return (
    <>
      {videos &&
        videos.map((item) => (
          <Link
            key={item && item.id.videoId}
            to={`/watch/${item.id.videoId}`}
            className={classes.root}
          >
            <Grid container spacing={2}>
              <Grid container item md={4}>
                <img
                  className={classes.relatedVideoThumbnail}
                  src={
                    item && item.snippet && item.snippet.thumbnails.default.url
                  }
                  alt=""
                />
              </Grid>
              <Grid container direction="column" item md={8}>
                <Typography
                  noWrap
                  className={classes.videoTitle}
                  gutterBottom
                  component="h6"
                  noWrap
                >
                  {item.snippet && item.snippet.title}
                </Typography>
                <Typography className={classes.channelName}>
                  {item.snippet && item.snippet.channelTitle}
                </Typography>
                <Typography className={classes.videoInfo}>
                  {numeral(item.viewCount).format("0.a")} views
                  <FiberManualRecordIcon className={classes.dot} />
                  {moment(item.snippet && item.snippet.publishedAt).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </Link>
        ))}
    </>
  );
};

export default RelatedVideos;

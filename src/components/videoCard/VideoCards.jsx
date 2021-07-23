import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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
  const useStyles = makeStyles({
    root: {
      width: 320,
      margin: "1rem",
      position: "relative",
      backgroundColor: state.theme.palette.primary.light,
      color: state.theme.palette.primary.contrastText,
    },
    media: {
      height: 180,
    },
    duration: {
      position: "absolute",
      top: "155px",
      right: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "2px 5px",
    },
    channelName: {
      fontSize: "0.9rem",
    },
    videoInfo: {
      fontSize: "0.8rem",
    },
    videoDetails: {
      display: "block",
      color: state.theme.palette.primary.gray,
    },
    dot: {
      fontSize: ".4rem",
      margin: "0px 5px",
    },
  });
  const classes = useStyles();
  const seconds = moment.duration(value.contentDetails.duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  return (
    <Card className={classes.root}>
      <Link to={`/watch/${value.id}`}>
        <CardActionArea>
          <div>
            <img
              className={classes.media}
              src={value.snippet.thumbnails.medium.url}
              alt="..."
            />
            <span className={classes.duration}>{_duration}</span>
          </div>
          <CardContent>
            <Typography
              noWrap
              className={classes.videoTitle}
              gutterBottom
              component="h6"
            >
              {value.snippet.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className={classes.videoDetails}>
        <Typography className={classes.channelName}>
          {value.snippet.channelTitle}
        </Typography>
        <Typography className={classes.videoInfo}>
          {numeral(value.statistics.viewCount).format("0.a")} views
          <FiberManualRecordIcon className={classes.dot} />
          {moment(value.snippet.publishedAt).fromNow()}
        </Typography>
      </CardActions>
    </Card>
  );
}

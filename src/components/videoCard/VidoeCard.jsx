import { Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {},
  videoLink: { display: "flex", gap: 10 },

  avatar: {
    backgroundColor: red[500],
  },
  videoTitle: {
    fontSize: "1.2rem",
    margin: "0px",
    display: "flex",
    alignItems: "center",
  },
  videoDuration: {
    display: "flex",
    marginTop: 15,
    justifyContent: "space-between",
  },
}));

export default function VideoCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://i.ytimg.com/an_webp/AKeaaa8yAAk/mqdefault_6s.webp?du=3000&sqp=CKiSxYcG&rs=AOn4CLCBtGxspYx6TrJFwuuNWHJkNrIcHg"
        title="Paella dish"
      />
      <CardContent className={classes.cardContent}>
        <Box className={classes.videoLink}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Typography className={classes.videoTitle} component="p" noWrap>
            This impressive paella is a perfect party dish and a fun mea
          </Typography>
        </Box>
        <Box className={classes.videoDuration}>
          <small>111K views</small>
          <small>3 month ago</small>
        </Box>
      </CardContent>
    </Card>
  );
}

import { Box, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../App";
import VideoCards from "../videoCard/VideoCards";
const RecomandedVideo = () => {
  const [state] = useContext(AppContext);
  const useStyles = makeStyles({
    root: {
      paddingTop: "80px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      backgroundColor: state.theme.palette.primary.dark,
    },
  });
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {state.videos.map((item) => (
        <VideoCards key={item.id} value={item} />
      ))}
    </Box>
  );
};

export default RecomandedVideo;

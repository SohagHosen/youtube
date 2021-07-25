import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const SearchCards = ({ data }) => {
  const [state] = useContext(AppContext);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "90%",
      maxWidth: "800px",
      margin: "auto",
    },
    thumb: {
      width: "100%",
    },
    cardLink: {
      textDecoration: "none",
      color: state.theme.palette.primary.contrastText,
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
      {data && (
        <Box className={classes.root}>
          <Link to={`/watch/${data.id.videoId}`} className={classes.cardLink}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid container item xs={12} sm={5}>
                <img
                  className={classes.thumb}
                  src={data.snippet.thumbnails.medium.url}
                  alt="..."
                  width="320px"
                  height="180"
                />
              </Grid>
              <Grid container item xs={12} sm={7}>
                <Box>
                  <Typography
                    className={classes.videoTitle}
                    gutterBottom
                    component="h6"
                  >
                    {data.snippet.title}
                  </Typography>
                  <Typography className={classes.channelName}>
                    {data.snippet.channelTitle}
                  </Typography>
                  <Typography className={classes.videoInfo}>
                    {moment(data.snippet.publishedAt).fromNow()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Link>
        </Box>
      )}
    </>
  );
};

export default SearchCards;

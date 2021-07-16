import { Avatar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { AppContext } from "../App";

function Media({ loading }) {
  const [state] = useContext(AppContext);
  console.log(loading);
  return (
    <Grid container wrap="wrap" justifyContent="center">
      {(loading
        ? Array.from(new Array(state.videos.length))
        : state.videos
      ).map((item, index) => (
        <Box key={index} width={250} m={3}>
          {item ? (
            <img
              style={{ width: 250, height: 158 }}
              alt={item.title}
              src={item.snippet.thumbnails.medium.url}
            />
          ) : (
            <Skeleton variant="rect" width={250} height={158} />
          )}

          {item ? (
            <Box pr={2}>
              <Box display="flex">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Box ml={1} clone>
                  <Typography gutterBottom variant="body2">
                    {item.snippet.title}
                  </Typography>
                </Box>
              </Box>
              <Typography
                display="block"
                variant="caption"
                color="textSecondary"
              >
                {item.channel}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {`${item.views} • ${item.createdAt}`}
              </Typography>
            </Box>
          ) : (
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};
export default function LoadingSkeleton() {
  const [state] = useContext(AppContext);
  return (
    <Box overflow="hidden">
      {state.videos.length === 0 ? (
        <Media loading={true} />
      ) : (
        <Media loading={false} />
      )}
    </Box>
  );
}

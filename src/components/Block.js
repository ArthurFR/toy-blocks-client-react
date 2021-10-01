import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";

const Block = ({ block }) => {
  const classes = useStyles();

  return (
    <Box className={classes.block}>
      <Typography className={classes.index}>
        {Array.from(Array(3 - `${block.index}`.length)).map(() => '0')}
        {block.index}
      </Typography>
      <Typography className={classes.data}>{block.data}</Typography>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  block: {
    backgroundColor: "#e0e0e0",
    marginBottom: "5px",
    padding: "6px",
  },
  index: {
    fontSize: "12px",
    color: "blue",
  },
  data: {
    fontSize: "14px",
  },
}));

Block.propTypes = {
  block: PropTypes.shape({
    index: PropTypes.number,
    data: PropTypes.string,
  }).isRequired,
};

export default Block;

import React from "react";
import PropTypes from "prop-types";
import { Box, Card as MaterialCard } from "@material-ui/core";

const Card = ({ children }) => (
  <MaterialCard variant="outlined">
    <Box p="1rem">{children}</Box>
  </MaterialCard>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;

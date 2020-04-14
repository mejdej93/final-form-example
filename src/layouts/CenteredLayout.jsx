import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

const CenteredLayout = ({ children }) => (
  <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    style={{ height: "100%", paddingTop: "1rem" }}
  >
    <Grid item>{children}</Grid>
  </Grid>
);

CenteredLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenteredLayout;

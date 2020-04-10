import React from "react";
import * as yup from "yup";
import { setIn } from "final-form";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { Container, Button, Box, Grid } from "@material-ui/core";

const translations = {
  required: "This field is required",
  email: "E-mail address is not correct",
};

const validationSchema = yup.object({
  firstName: yup.string().required(translations.required),
  lastName: yup.string().required(translations.required),
  email: yup.string().email(translations.email).required(translations.required),
});

const validate = async (values) => {
  try {
    await validationSchema.validate(values, { abortEarly: false });
  } catch (e) {
    return e.inner.reduce(
      (errors, error) => setIn(errors, error.path, error.message),
      {}
    );
  }
};

const ExampleForm = () => {
  const onSubmit = () => {};

  return (
    <Container maxWidth="sm">
      <Form
        onSubmit={onSubmit}
        validate={(values) => validate(values)}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="hero-content">
              <h1 className="title">Sign-up</h1>
              <h2 className="subtitle">Please provide some info about you</h2>
            </div>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Field
                  name="firstName"
                  label="First name"
                  variant="outlined"
                  component={TextField}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  name="lastName"
                  label="Last name"
                  variant="outlined"
                  component={TextField}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="email"
                  label="E-mail address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  component={TextField}
                  required
                />
              </Grid>
            </Grid>

            <Box mt="3rem">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
                disabled={submitting}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      />
    </Container>
  );
};

export default ExampleForm;

import React from "react";
import * as yup from "yup";
import { setIn } from "final-form";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio } from "final-form-material-ui";
import {
  Container,
  Button,
  Box,
  Grid,
  FormControlLabel,
  CircularProgress,
} from "@material-ui/core";
import CenteredLayout from "layouts/CenteredLayout";
import Card from "components/Card";

const translations = {
  required: "This field is required",
  email: "E-mail address is not correct",
  termsAcceptance: "Terms acceptance is required to sign-up",
};

const validationSchema = yup.object({
  firstName: yup.string().required(translations.required),
  lastName: yup.string().required(translations.required),
  email: yup.string().email(translations.email).required(translations.required),
  termsAcceptance: yup.bool().required(translations.termsAcceptance),
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
  const onSubmit = async (values) => {
    return new Promise((resolve, reject) => {
      console.log(values);
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  return (
    <CenteredLayout>
      <Container maxWidth="sm">
        <Card>
          <Form
            onSubmit={onSubmit}
            validate={(values) => validate(values)}
            render={({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                <h1 className="title">Sign-up</h1>
                <h2 className="subtitle">Please provide some info about you</h2>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="firstName"
                      label="First name"
                      variant="outlined"
                      component={TextField}
                      autoComplete="on"
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
                      autoComplete="on"
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
                      autoComplete="on"
                      component={TextField}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="gender"
                      label="Female"
                      type="radio"
                      value="female"
                      render={({ input, meta, required, ...props }) => (
                        <FormControlLabel
                          control={
                            <Radio
                              input={input}
                              meta={meta}
                              required={required}
                            />
                          }
                          {...props}
                        />
                      )}
                      required
                    />
                    <Field
                      name="gender"
                      label="Male"
                      value="male"
                      type="radio"
                      render={({ input, meta, required, ...props }) => (
                        <FormControlLabel
                          control={
                            <Radio
                              input={input}
                              meta={meta}
                              required={required}
                            />
                          }
                          {...props}
                        />
                      )}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="termsAcceptance"
                      type="checkbox"
                      required
                      render={({ input, ...props }) => {
                        return (
                          <FormControlLabel
                            control={<Checkbox input={input} {...props} />}
                            label="I accept the terms and conditions"
                          />
                        );
                      }}
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
                    {submitting ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Box>
              </form>
            )}
          />
        </Card>
      </Container>
    </CenteredLayout>
  );
};

export default ExampleForm;

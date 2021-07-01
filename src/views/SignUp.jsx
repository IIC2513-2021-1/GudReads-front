import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [message. setMessage] = useState("");

  const createUser = async function createUser(values) {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      setMessage("User has been sucesesfully created");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          acceptedTerms: false
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, 'Your name must be at least 3 characters')
            .max(15, 'Your name must be 15 characters or less')
            .required('This field is required'),
          lastName: Yup.string()
            .min(2, 'Your lastname must be at least 2 characters')
            .max(15, 'Your lastname must be 15 characters or less')
            .required('This field is required'),
          email: Yup.string()
            .email('Invalid email')
            .required('Required'),
          password: Yup.string()
            .min(6, 'Your password must be at least 6 characters')
            .max(15, 'Your password must be 15 characters or less')
            .required('Password is required'),
          passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'Please accept terms and conditions')
        })}
        onSubmit={async (values) => {
          await createUser(values);
        }}

      >
        {({ errors, touched }) => (
          <Form>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}
            <Field name="email" />
            {errors.email && touched.email ? (
              <div>{errors.email}</div>
            ) : null}
            <Field name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <Field name="passwordConfirmation" />
            {errors.passwordConfirmation && touched.passwordConfirmation ? (
              <div>{errors.passwordConfirmation}</div>
            ) : null}
            <Field type="checkbox" name="acceptedTerms" />
            {errors.acceptedTerms && touched.acceptedTerms ? (
              <div>{errors.acceptedTerms}</div>
            ) : null}
            <button type="submit">Create account</button>
          </Form>
        )}
      </Formik>
      <p>{message}</p>
    </div>
  );

};
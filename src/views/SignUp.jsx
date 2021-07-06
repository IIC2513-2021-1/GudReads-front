/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="form">
      <h2>Sign up!</h2>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          acceptedTerms: false,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .min(3, 'Your name must be at least 3 characters')
            .max(15, 'Your name must be 15 characters or less')
            .required('This field is required'),
          lastName: Yup.string()
            .min(2, 'Your last name must be at least 2 characters')
            .max(15, 'Your last name must be 15 characters or less')
            .required('This field is required'),
          email: Yup.string()
            .email('Invalid email')
            .required('This field is required'),
          password: Yup.string()
            .min(6, 'Your password must be at least 6 characters')
            .max(15, 'Your password must be 15 characters or less')
            .required('Password is required'),
          passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'Please accept terms and conditions'),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, requestOptions);
            if (response.status !== 201) {
              const error = await response.text();
              throw new Error(error);
            }
            setMessage('User has been successfully created');
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <Field name="firstName" placeholder="Name" />
              {errors.firstName && touched.firstName && (
                <div>{errors.firstName}</div>
              )}
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" placeholder="Last name" />
              {errors.lastName && touched.lastName && (
                <div>{errors.lastName}</div>
              )}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" placeholder="Email" />
              {errors.email && touched.email && (
                <div>{errors.email}</div>
              )}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" placeholder="Password" />
              {errors.password && touched.password && (
                <div>{errors.password}</div>
              )}
            </div>
            <div>
              <label htmlFor="passwordConfirmation">Password Confirmation</label>
              <Field type="password" name="passwordConfirmation" placeholder="Password Confirmation" />
              {errors.passwordConfirmation && touched.passwordConfirmation && (
                <div>{errors.passwordConfirmation}</div>
              )}
            </div>
            <div>
              <label htmlFor="acceptedTerms">Accept terms and conditions?</label>
              <Field type="checkbox" name="acceptedTerms" />
              {errors.acceptedTerms && touched.acceptedTerms && (
                <div>{errors.acceptedTerms}</div>
              )}
            </div>
            <div>
              <button type="submit">Create account</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>{message}</p>
    </div>
  );
}

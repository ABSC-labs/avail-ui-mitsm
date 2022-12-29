import React from 'react';
import { useAuthUser } from '@crema/utility/AuthHooks';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import PersonalInfoForm from './PersonalInfoForm';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Required'),
});
function PersonalInfo() {
  const { user } = useAuthUser();

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 550,
      }}
    >
      <Formik
        validateOnBlur
        initialValues={{
          ...user,
          photoURL: user?.photoURL ? user.photoURL : '/assets/images/placeholder.jpg',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log('data: ', data);
          // TODO Api Call here to save user info
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => <PersonalInfoForm values={values} setFieldValue={setFieldValue} />}
      </Formik>
    </Box>
  );
}

export default PersonalInfo;

PersonalInfo.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};

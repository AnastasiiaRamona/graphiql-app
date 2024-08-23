import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
      'Email must be a valid email'
    )
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\p{N}/u, 'Password must contain at least one digit')
    .matches(/\p{Ll}/u, 'Password must contain at least one lowercase letter')
    .matches(/\p{Lu}/u, 'Password must contain at least one uppercase letter')
    .matches(
      /[\p{S}\p{P}]/u,
      'Password must contain at least one special character'
    )
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

type User = yup.InferType<typeof schema>;
export default schema;
export type { User };

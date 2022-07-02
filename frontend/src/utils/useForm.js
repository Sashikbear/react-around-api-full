import { useState, useEffect } from 'react';

const useForm = (validate) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    avatar: '',
    title: '',
    link: '',
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [isErrorFree, setErrorFree] = useState(true);

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setErrorFree(true);
    } else {
      setErrorFree(false);
    }
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
  };

  return {
    handleChange,
    onSubmit,
    values,
    errors,
    isErrorFree,
  };
};

export default useForm;

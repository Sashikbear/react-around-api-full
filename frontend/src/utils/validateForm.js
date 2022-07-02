export function validateLoginInfo(values) {
  let errors = {};

  if (!values.email) {
    errors.email = 'Email address is required. Please fill in this field.';
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)) {
    errors.email = 'The email address has an invalid format.';
  } else if (!values.password) {
    errors.password = 'Password is required. Please fill in this field.';
  } else if (values.password.length < 8) {
    errors.password = 'Please lengthen your password to 8 characters or more.';
  }

  return errors;
}
export function validateAvatar(values) {
  let errors = {};
  if (!values.avatar) {
    errors.avatar = 'A url is required. Please fill in this field.';
  } else if (!/^(http|https):\/\/(www\.)?[a-z0-9\-/.]+/gi.test(values.avatar)) {
    errors.avatar = 'The url has an invalid format.';
  }

  return errors;
}
export function validateNewCard(values) {
  let errors = {};

  if (!values.title) {
    errors.title = 'A title is required. Please fill in this field.';
  } else if (!values.link) {
    errors.link = 'A url is required. Please fill in this field.';
  } else if (!/^(http|https):\/\/(www\.)?[a-z0-9\-/.]+/gi.test(values.link)) {
    errors.link = 'The url has an invalid format.';
  }

  return errors;
}
export function validateUserInfo(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'A name is required. Please fill in this field.';
  } else if (values.name.length < 2) {
    errors.name = 'Please lengthen your name to 2 characters or more.';
  } else if (!values.description) {
    errors.description =
      'A description is required. Please fill in this field.';
  } else if (values.description.length < 2) {
    errors.description =
      'Please lengthen your description to 2 characters or more.';
  }
  return errors;
}

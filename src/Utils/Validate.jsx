const validate = (values) => {
  const errors = {};
  //   if (!values.firstName) {
  //     errors.firstName = "El nombre es requerido";
  //   } else if (values.firstName.length < 1) {
  //     errors.firstName = "Nombre Invalido";
  //   }

  //   if (!values.lastName) {
  //     errors.lastName = "El apellido es requerido";
  //   } else if (values.lastName.length < 1) {
  //     errors.lastName = "Apellido invalido";
  //   }

  if (!values.email) {
    errors.email = "El email es requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email invalido";
  }

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  } else if (values.password.length <= 6) {
    errors.password = "Contraseña invalida";
  }

  //   if (!values.Vpassword) {
  //     errors.Vpassword = "Ingrese nuevamente la contraseña";
  //   } else if (values.Vpassword !== values.password) {
  //     errors.Vpassword = "Las contraseñas no coindiden";
  //   }

  return errors;
};

export default validate;

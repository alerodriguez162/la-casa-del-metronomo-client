import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UsersContext from "../../Context/UsersContext/UsersContext";

const SignUp = () => {
  const userContext = useContext(UsersContext);
  const { register } = userContext;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Requerido";
      }
      if (!values.firstName) {
        errors.firstName = "Requerido";
      }
      if (!values.lastName) {
        errors.lastName = "Requerido";
      }
      if (!values.password) {
        errors.password = "Requerido";
      }
      return errors;
    },
    onSubmit: async (values) => {
      // await login(values);
      await register(values);
    },
  });
  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img className="h-12 w-auto" src="https://res.cloudinary.com/di9gjsobh/image/upload/v1634804968/metronome_icon-icons.com_60037_uc309z.png" alt="Workflow" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Registrate</h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      {...formik.getFieldProps("email")}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.email && formik.errors.email ? <div className="mt-2 text-sm text-red-600">{formik.errors.email}</div> : null}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      {...formik.getFieldProps("password")}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.password && formik.errors.password ? <div className="mt-2 text-sm text-red-600">{formik.errors.password}</div> : null}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="firstName"
                      {...formik.getFieldProps("firstName")}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.firstName && formik.errors.firstName ? <div className="mt-2 text-sm text-red-600">{formik.errors.firstName}</div> : null}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Apellido
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="lastName"
                      {...formik.getFieldProps("lastName")}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.lastName && formik.errors.lastName ? <div className="mt-2 text-sm text-red-600">{formik.errors.lastName}</div> : null}
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  {/* <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div> */}

                  <div className="text-sm">
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Iniciar Sesion
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Registrate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img className="absolute inset-0 h-full w-full object-cover" src="https://images.alphacoders.com/109/1090851.jpg" alt="" />
      </div>
    </div>
  );
};

export default SignUp;

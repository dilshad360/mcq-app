import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { login } from "../services/api";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Login = () => {
  const { login: authLogin } = useAuth();

  const initialValues = { mobile: "", password: "" };

  const validationSchema = Yup.object({
    mobile: Yup.string().required("Mobile is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const { data } = await login(values);
      authLogin(data);
    } catch (error) {
      toast.error(error.response.data);
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="card-title text-[32px] text-primary pb-3 relative">
        Login
        <span className="absolute bottom-4 left-0 w-full h-[8px] bg-[#fac167] z-[-1]"></span>
      </h2>
      <div className="card md:w-[440px] shadow-xl">
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-4">
                <div className="form-control flex flex-col gap-1">
                  <label className="text-xl font-semibold">Mobile Number</label>
                  <PhoneInput
                    country={"in"}
                    value={values.mobile}
                    onChange={(phone) => setFieldValue("mobile", phone)}
                    className="w-full"
                    inputStyle={{ width: "100%", height: "40px" }}
                    inputClass="input input-bordered w-full"
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="form-control flex flex-col gap-1">
                  <label className="text-xl font-semibold">Password</label>
                  <Field
                    placeholder="Enter password"
                    name="password"
                    type="password"
                    className="input input-bordered w-full"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full mt-4">
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <span className="text-center pt-4">
            Don’t have an account?{" "}
            <a className="text-[#006eec]" href="/register">
              Register Now
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Register = () => {
    const navigate = useNavigate();

    const initialValues = {
        fullName: "",
        email: "",
        mobile: "",
        status: "Student",
        password: "",
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        mobile: Yup.string().required("Mobile is required"),
        status: Yup.string().required("Status is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const handleSubmit = async (values) => {
        try {
            const { data } = await register(values);
            toast.success(data);
        } catch (error) {
            toast.error(error.response.data);
            return;
        }
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center pt-20 md:pt-0">
            <h2 className="card-title text-[32px] text-primary pb-3 relative">
                Register
                <span className="absolute bottom-4 left-0 w-full h-[8px] bg-[#fac167] z-[-1]"></span>
            </h2>
            <div className="card md:w-[440px] shadow-xl ">
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, values }) => (
                            <Form className="space-y-4">
                                <div className="form-control flex flex-col gap-1">
                                    <label className="text-xl font-semibold">Full Name</label>
                                    <Field
                                        placeholder="Enter your name"
                                        name="fullName"
                                        className="input input-bordered w-full"
                                    />
                                    <ErrorMessage
                                        name="fullName"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div className="form-control flex flex-col gap-1">
                                    <label className="text-xl font-semibold">Email</label>
                                    <Field
                                        placeholder="Enter your email"
                                        name="email"
                                        type="email"
                                        className="input input-bordered w-full"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div className="form-control flex flex-col gap-1">
                                    <label className="text-xl font-semibold">Mobile</label>
                                    <PhoneInput
                                        country={"in"} 
                                        value={values.mobile}
                                        onChange={(phone) => setFieldValue("mobile", phone)}
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
                                    <label className="text-xl font-semibold">Current Status</label>
                                    <div className="flex gap-3">
                                        <label className="flex items-center gap-2">
                                            <Field
                                                type="radio"
                                                name="status"
                                                value="Student"
                                                className="radio radio-primary radio-sm"
                                            />
                                            <span>Student</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <Field
                                                type="radio"
                                                name="status"
                                                value="Employee"
                                                className="radio radio-primary radio-sm"
                                            />
                                            <span>Employee</span>
                                        </label>
                                    </div>
                                    <ErrorMessage
                                        name="status"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div className="form-control flex flex-col gap-1">
                                    <label className="text-xl font-semibold">Password</label>
                                    <Field
                                        placeholder="Enter your password"
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
                                    Register
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <span className="text-center pt-4">
                        Already have an account?{" "}
                        <a className="text-[#006eec]" href="/">
                            Login Now
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Register;

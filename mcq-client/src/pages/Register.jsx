import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const initialValues = {
        fullName: '',
        email: '',
        mobile: '',
        status: 'Student',
        password: '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        mobile: Yup.string().matches(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number').required('Mobile is required'),
        status: Yup.string().required('Status is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSubmit = async (values) => {
        await register(values);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Register</h2>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Form>
                            <div className="form-control">
                                <label>Full Name</label>
                                <Field name="fullName" className="input input-bordered" />
                                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="form-control">
                                <label>Email</label>
                                <Field name="email" type="email" className="input input-bordered" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="form-control">
                                <label>Mobile</label>
                                <Field name="mobile" className="input input-bordered" />
                                <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="form-control">
                                <label>Status</label>
                                <Field as="select" name="status" className="select select-bordered">
                                    <option value="Student">Student</option>
                                    <option value="Employee">Employee</option>
                                </Field>
                            </div>

                            <div className="form-control">
                                <label>Password</label>
                                <Field name="password" type="password" className="input input-bordered" />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <button type="submit" className="btn btn-primary w-full mt-4">Register</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Register;

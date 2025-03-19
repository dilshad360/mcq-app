import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { useAuth } from '../context/authContext';

const Login = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    const initialValues = { mobile: '', password: '' };

    const validationSchema = Yup.object({
        mobile: Yup.string().required('Mobile is required'),
        password: Yup.string().required('Password is required'),
    });


    const handleSubmit = async (values) => {
        try {
            const { data } = await login(values);
            localStorage.setItem('token', data.token);
            login(data.token);
            alert('Login successful');
            // navigate('/test');
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className='text-red-500'>sdsd</p>
            <div className="card w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Form>
                            <div className="form-control">
                                <label>Mobile</label>
                                <Field name="mobile" className="input input-bordered" />
                                <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="form-control">
                                <label>Password</label>
                                <Field name="password" type="password" className="input input-bordered" />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <button type="submit" className="btn btn-primary w-full mt-4">Login</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;

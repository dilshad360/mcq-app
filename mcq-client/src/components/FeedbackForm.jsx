import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFeedback, submitFeedback } from '../services/api';

const FeedbackForm = ({ userId }) => {
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await getUserFeedback(userId);
                if (response.data.length > 0) {
                    setSubmitted(true);
                }
            } catch (error) {
                console.error('❌ Error fetching results:', error);
            }
        };
        fetchFeedback();
    }, []);

    const emojiRatings = [
        { image: '/assets/emoji/1.png', value: 1 },
        { image: '/assets/emoji/2.png', value: 2 },
        { image: '/assets/emoji/3.png', value: 3 },
        { image: '/assets/emoji/4.png', value: 4 },
        { image: '/assets/emoji/5.png', value: 5 }
    ];


    const validationSchema = Yup.object().shape({
        rating: Yup.number().required('Please select a rating'),
        comments: Yup.string()
            .required('Comments are required')
            .min(10, 'Comments must be at least 10 characters')
            .max(500, 'Comments cannot exceed 500 characters')
    });

    const handleSubmit = async (values, { resetForm }) => {
        console.log('Feedback Submitted:', { ...values, userId });
        const response = await submitFeedback({ ...values, userId });
        console.log(response);
        setSubmitted(true);
        resetForm();
    };

    if(submitted) return null

    return (
        <div className="flex items-center justify-center">
            <div className="card min-w-[850px] shadow-xl p-6">
                <h2 className="font-bold mb-5">Feedback</h2>
                    <Formik
                        initialValues={{ rating: '', comments: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, values }) => (
                            <Form className="space-y-4">
                            
                                <div className="form-control">
                <h6 className="font-semibold text-xl ">Give us a feedback!</h6>
                                    <label className="label ">Your input is important for us. We take customer feedback very seriously.</label>
                                    <div className="flex  space-x-4 pt-6">
                                        {emojiRatings.map((emoji) => (
                                            <button
                                            key={emoji.value}
                                            type="button"
                                            onClick={() => setFieldValue('rating', emoji.value)}
                                            className={`flex items-center justify-center text-4xl w-[70px] h-[70px] rounded-full transition-all ${values.rating === emoji.value ? 'bg-green-300' : 'bg-gray-200'} hover:bg-green-300`}
                                        >
                                            <img src={emoji.image} className={`${values.rating === emoji.value ? '' : 'grayscale'}  `} width="40" height="40" alt={emoji.value} />
                                        </button>
                                        ))}
                                    </div>
                                    <ErrorMessage name="rating" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                            
                                <div className="form-control">
                                    <Field
                                        as="textarea"
                                        name="comments"
                                        rows="5"
                                        placeholder="add a comments"
                                        className="textarea textarea-bordered w-full bg-[#f3f4f6] mt-6"
                                    />
                                    <ErrorMessage name="comments" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                    
                                <div >
                                    <button type="submit" className="btn btn-primary w-1/2">
                                        Submit Feedback
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
            </div>
        </div>
    );
};

export default FeedbackForm;

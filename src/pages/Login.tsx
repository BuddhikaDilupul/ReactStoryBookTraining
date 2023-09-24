import { Form, Row, Col, Container } from 'react-bootstrap'
import '../css/registration.css'
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS
import img from '../assesst/react-logo.png'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Button from "../stories/button/Button";
import FormGroup from '../stories/text/TextFeild';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../Utils';

const Login = () => {

    const navigate = useNavigate()
    const { handleSetAlert, handleSetServerErrorAlert } = useAlert();

    interface FormValues {
        password: string,
        email: string,
    }
    const schema = Yup.object().shape({
        email: Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"),
        password: Yup.string().required('Password is required').min(8, 'At least minimum 8 characters').matches(
            /^(?=.*[A-Z])/,
            'Password must contain at least one capital letter'
        ).matches(
            /^(?=.*[a-z])/,
            'Password must contain at least one lowercase letter'
        ).matches(/^(?=.*\d)/, 'Password must contain at least one digit')
            .matches(
                /^(?=.*[@$!%*?&])/,
                'Password must contain at least one special character'
            ),

    })
    const initialValues: FormValues = {
        email: '',
        password: '',
    };

    const onSubmit = async (values: any) => {
        try {
            await axios.post(' http://localhost:4008/api/login', values).then(response => {
                if (response.status === 200) {
                    navigate('/home')
                } else {
                    handleSetAlert("Invalid credential. Please try again.", "danger");
                }
            })
        } catch (error) {
            handleSetServerErrorAlert()
            console.error("Error:", error);
        }
    };

    return (
        <Container style={{ marginTop: '4rem' }}>
            <Row className="login-row mb-3">
                <Col className="textbox-column" xs={12} md={3}>
                    <br />
                    <h3><b>Login Form</b></h3>
                    <div style={{ marginTop: '3rem' }}>
                        <Formik
                            validationSchema={schema}
                            onSubmit={onSubmit}
                            initialValues={initialValues}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                touched,
                                errors,
                                handleBlur,
                            }) => (
                                <div>
                                    <Form noValidate onSubmit={handleSubmit}>

                                        <FormGroup
                                            label="Email"
                                            controlId="formGridEmail"
                                            className='mb-3'
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            isValid={touched.email && !errors.email}
                                            isInvalid={touched.email && !!errors.email}
                                            value={values.email}
                                            feedbackText={errors.email}
                                        />


                                        <FormGroup
                                            controlId="formGridPassword"
                                            type="password"
                                            label='Password'
                                            placeholder="Enter Password"
                                            className='mb-3'
                                            name='password'
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            isValid={touched.password && !errors.password}
                                            isInvalid={touched.password && !!errors.password}
                                            feedbackText={errors.password}
                                            value={values.password}
                                        />
                                        <div className="d-grid gap-2 mb-3">
                                            <Button type="submit" label='Submit' variant='primary' style='' />
                                        </div>
                                    </Form>

                                </div>
                            )}
                        </Formik>
                        Don't you have an account ? <Button variant="link" label='Signup' type='button' style='' />
                    </div>
                </Col>
                <Col className="line-column">
                    <div className="vertical-line"></div>
                </Col>
                <Col style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} xs={12} md={8}>
                    <img src={img} alt="react" height={'250px'} width={'350px'} />
                    <br />
                    <div className='React-heading'>ReactJS</div>
                    <div className='Training-heading'>Training</div>
                </Col>
            </Row>
        </Container>
    );

};

export default Login;

import { useState } from 'react'
import { Form, Row, Col, Container } from 'react-bootstrap'
import '../css/registration.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS
import Dropdown from 'react-bootstrap/Dropdown'
import img from '../assesst/react-logo.png'
import moment from 'moment';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Button from "../stories/button/Button";
import { useNavigate } from 'react-router-dom';
import FormGroup from '../stories/text/TextFeild';
import Alert from '../stories/alert/Alert'
import { useSelector } from "react-redux";
import { RootState } from '../app/store'
import { useAlert } from '../Utils';

const Registration = () => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedBDate, setSelectedBDate] = useState<string>("");
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const numbers: number[] = Array.from({ length: 31 }, (_, index) => index + 1);
    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [selectedDateError, setSelectedDateError] = useState<string | null>(null);
    const navigate = useNavigate();
    const alertStatus = useSelector((state: RootState) => state.alertStatus);
    const { handleSetAlert, handleSetServerErrorAlert } = useAlert();


    const handleSelectedDate = (date: number) => {
        setSelectedDate(date)
        setSelectedDateError(null);
        if (selectedYear !== null && selectedMonth !== null) {
            const selectedMoment = moment({ year: selectedYear, month: selectedMonth - 1, day: date });
            const formattedDate = selectedMoment.format('YYYY-MM-DD');
            if (formattedDate.toString() === "Invalid date") {
                setSelectedDateError('Select valid date');
                return false
            }
            setSelectedBDate(formattedDate)
            return true

        }
    };

    const handleSelectedMonth = (month: number) => {
        setSelectedMonth(month)
    };
    const handleSelectedYear = (year: number) => {
        setSelectedYear(year)
    };

    interface FormValues {
        firstName: string;
        lastName: string;
        password: string,
        email: string,
        confirmPassword: string,
        phone: string,
        gender: string,
        bday: string,
        terms: boolean;
    }
    const schema = Yup.object().shape({
        firstName: Yup.string().required('First name is required').matches(/^[^\d]+$/, 'should not contain numbers'),
        lastName: Yup.string().required('Last name is required').matches(/^[^\d]+$/, 'should not contain numbers'),
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
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
        phone: Yup.string().required('Phone number is required').matches(/^\d{10}$/, 'Phone number not valid'),
        gender: Yup.string().required('gender is required'),
        terms: Yup.bool().required().oneOf([true], 'Terms must be accepted'),

    })
    const initialValues: FormValues = {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        password: '',
        confirmPassword: '',
        phone: '',
        terms: false,
        bday: ''
    };

    const onSubmit = async (values: any) => {
        console.log(values);
        try {
            await axios.post('http://localhost:4008/api/registration', values).then(response => {
                if (response.status === 201) {
                    handleSetAlert("Successfully Saved","success");
                    navigate("/")
                } else {
                    handleSetAlert("Failed to save data. Please try again.","danger");
                }
            })
        } catch (error) {
            handleSetServerErrorAlert()
            console.error("Error:", error);
        }
    };

    const handleSubmit = (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        if (selectedDateError === null) { values.bday = selectedBDate; onSubmit(values) }
        setSubmitting(false);
    };

    return (
        <Container style={{ marginTop: '4rem' }}>
            {alertStatus.text !== null && alertStatus.variant !== null ?
                <Row>
                    <Alert text={alertStatus.text} variant={alertStatus.variant} />
                </Row> : null}
            <Row className="login-row mb-3">
                <Col className="textbox-column" xs={12} md={3}>
                    <br />

                    <h3><b>Registration Form</b></h3>
                    <div style={{ marginTop: '3rem' }}>
                        <Formik
                            validationSchema={schema}
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                touched,
                                errors,
                                handleBlur
                            }) => (
                                <div>
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <FormGroup
                                            type="text"
                                            placeholder="Enter first name"
                                            className='mb-3'
                                            label="First name"
                                            controlId="formGridFirstName"
                                            name="firstName"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.firstName}
                                            isValid={touched.firstName && !errors.firstName}
                                            isInvalid={touched.firstName && !!errors.firstName}
                                            feedbackText={errors.firstName}
                                        />
                                        <FormGroup
                                            type="text"
                                            placeholder="Enter Last name"
                                            className='mb-3'
                                            label="Last name"
                                            controlId="formGridLastName"
                                            name="lastName"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.lastName}
                                            isValid={touched.lastName && !errors.lastName}
                                            isInvalid={touched.lastName && !!errors.lastName}
                                            feedbackText={errors.lastName}
                                        />
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
                                            controlId="formGridPhone"
                                            type="text"
                                            label="Phone"
                                            placeholder="Enter Phone"
                                            className='mb-3'
                                            name="phone"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            isValid={touched.phone && !errors.phone}
                                            isInvalid={touched.phone && !!errors.phone}
                                            value={values.phone}
                                            feedbackText={errors.phone}
                                        />
                                        <br />
                                        <Form.Label><b>Gender</b></Form.Label>
                                        <Form.Group controlId="formGridGender">
                                            <Form.Check
                                                inline
                                                label="Male"
                                                value="male"
                                                name='gender'
                                                type='radio'
                                                id={`inline-radio-1`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.gender && !errors.gender}
                                                isInvalid={touched.gender && !!errors.gender}
                                            />
                                            <Form.Check
                                                inline
                                                name='gender'
                                                value="female"
                                                label="Female"
                                                type='radio'
                                                id={`inline-radio-2`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.gender && !errors.gender}
                                                isInvalid={touched.gender && !!errors.gender}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.gender}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <br />
                                        <Form.Group as={Col} controlId="formGridBday">
                                            <Form.Label><b>Birth Day</b></Form.Label>
                                            <div>
                                                <Row className='datepicker-row mb-3'>
                                                    <Col className='.datepicker-col '>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="outline-dark" id="date" disabled={selectedMonth === null}>
                                                                {selectedDate ? selectedDate : "Date"}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu style={{ overflowY: 'scroll', maxHeight: "300px" }} >
                                                                {numbers.map((number) => (
                                                                    <Dropdown.Item key={number} onClick={() => handleSelectedDate(number)}>{number}</Dropdown.Item>
                                                                ))}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        <div className="invalid-feedback" style={{ display: 'block' }}>
                                                            {selectedDateError}
                                                        </div>
                                                    </Col>
                                                    <Col className='.datepicker-col '>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="outline-dark" id="month" disabled={selectedYear === null} >
                                                                {selectedMonth ? selectedMonth : "Month"}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                {months.map((month, id) => (
                                                                    <Dropdown.Item key={month} onClick={() => handleSelectedMonth(id + 1)}>{month}</Dropdown.Item>
                                                                ))}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    <Col className='.datepicker-col '>
                                                        <DatePicker
                                                            onChange={(year: any) => handleSelectedYear(year.getFullYear())}
                                                            dateFormat="yyyy"
                                                            showYearPicker
                                                            placeholderText={selectedYear ? selectedYear.toString() : " Year"}
                                                            className="datepicker-item"
                                                            maxDate={new Date()}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form.Group>

                                        <FormGroup
                                            label="Password"
                                            type="password"
                                            controlId="formGridPassword"
                                            placeholder="Enter Password"
                                            className='mb-3'
                                            name='password'
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            isValid={touched.password && !errors.password}
                                            isInvalid={touched.password && !!errors.password}
                                            value={values.password}
                                            feedbackText={errors.password}
                                        />
                                        <FormGroup
                                            label="Confirm Password"
                                            type="password"
                                            placeholder="Enter Confirm Password"
                                            className='mb-3'
                                            name='confirmPassword'
                                            controlId="formGridConfirmPassword"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            isValid={touched.confirmPassword && !errors.confirmPassword}
                                            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                            value={values.confirmPassword}
                                            feedbackText={errors.confirmPassword}
                                        />

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Check
                                                id="autoSizingCheck2"
                                                label="I’d like to receive marketing promotions special offers updates."
                                                className='mb-3'
                                                required
                                                name="terms"
                                                onChange={handleChange}
                                                isInvalid={!!errors.terms}
                                                feedback={errors.terms}
                                                feedbackType="invalid"
                                            />
                                        </Form.Group>
                                        <div className="d-grid gap-2 mb-3">
                                            <Button type="submit" label='Submit' variant='primary' style=''/>
                                        </div>
                                    </Form>
                                    Already have an account ? <Button variant="link" label='Login' type='button' style ='' />
                                </div>
                            )}
                        </Formik>
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
            </Row >
        </Container >
    );
};

export default Registration;

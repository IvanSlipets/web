import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import HeaderComponent from './components/layout/header/HeaderComponent';
import FooterComponent from './components/layout/footer/FooterComponent';
import PrimaryButton from './components/common/PrimaryButton';
import FormikError from './components/common/FormikError';
import './AuthPage.css';

const RegistrationPage = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { username: '', email: '', password: '', retypePassword: '' },
        validationSchema: Yup.object({
            username: Yup.string().required('Обов\'язково'),
            email: Yup.string().email('Неправильний формат').required('Обов\'язково'),
            password: Yup.string().min(6, 'Мінімум 6 символів').required('Обов\'язково'),
            retypePassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Паролі мають збігатися')
                .required('Обов\'язково'),
        }),
        onSubmit: (values) => {
            localStorage.setItem('userEmail', values.email);
            navigate('/');
        },
    });

    return (
        <div className="app-global">
            <HeaderComponent activeTab="none" />
            <main className="container auth-container">
                <div className="auth-card">
                    <h1 className="auth-title">Register the new account</h1>
                    <form onSubmit={formik.handleSubmit} className="auth-form">
                        <div className="form-group">
                            <input name="username" placeholder="Username" onChange={formik.handleChange} value={formik.values.username} />
                        </div>
                        <div className="form-group">
                            <input name="email" placeholder="E-mail" onChange={formik.handleChange} value={formik.values.email} />
                        </div>
                        <div className="form-group">
                            <input name="password" type="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} />
                        </div>
                        <div className="form-group">
                            <input name="retypePassword" type="password" placeholder="Retype password" onChange={formik.handleChange} value={formik.values.retypePassword} />
                            <FormikError touched={formik.touched.retypePassword} error={formik.errors.retypePassword} />
                        </div>
                        <p className="auth-switch">
                            Already a member? <Link to="/login">Sign in</Link>
                        </p>
                        <PrimaryButton type="submit" className="auth-button">SIGN ME UP</PrimaryButton>
                    </form>
                </div>
            </main>
            <FooterComponent />
        </div>
    );
};

export default RegistrationPage;
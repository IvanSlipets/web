import { useFormik } from 'formik';
import * as Yup from 'yup';
import { /*useNavigate,*/ Link } from 'react-router-dom';
import HeaderComponent from './components/layout/header/HeaderComponent';
import FooterComponent from './components/layout/footer/FooterComponent';
import PrimaryButton from './components/common/PrimaryButton';
import FormikError from './components/common/FormikError';
import './AuthPage.css';

const LoginPage = () => {
    // const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Неправильний формат Email').required('Обов\'язкове поле'),
            password: Yup.string().min(6, 'Мінімум 6 символів').required('Обов\'язкове поле'),
        }),
        onSubmit: (values) => {
            localStorage.setItem('userEmail', values.email);
            window.location.href = '/'; // href для повного оновлення стану авторизації
        },
    });

    return (
        <div className="app-global">
            <HeaderComponent activeTab="none" />
            <main className="container auth-container">
                <div className="auth-card">
                    <h1 className="auth-title">Submit the form to sign in</h1>
                    <form onSubmit={formik.handleSubmit} className="auth-form">
                        <div className="form-group">
                            <input
                                name="email"
                                type="email"
                                placeholder="E-mail"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
                            />
                            <FormikError touched={formik.touched.email} error={formik.errors.email} />
                        </div>
                        <div className="form-group">
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
                            />
                            <FormikError touched={formik.touched.password} error={formik.errors.password} />
                        </div>
                        <p className="auth-switch">
                            Not a member? <Link to="/register">Sign up</Link>
                        </p>
                        <PrimaryButton type="submit" className="auth-button">LOGIN ME</PrimaryButton>
                    </form>
                </div>
            </main>
            <FooterComponent />
        </div>
    );
};

export default LoginPage;
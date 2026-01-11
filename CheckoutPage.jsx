import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import HeaderComponent from './components/layout/header/HeaderComponent';
import FooterComponent from './components/layout/footer/FooterComponent';
import PrimaryButton from './components/common/PrimaryButton';
import FormikError from './components/common/FormikError';
import { useSelector } from 'react-redux';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import './CheckoutPage.css';

// 1. СХЕМА ВАЛІДАЦІЇ YUP

const CheckoutSchema = Yup.object().shape({
    // 1. ПІБ (Обов'язкове, макс. довжина)
    fullName: Yup.string()
        .min(2, 'Мінімум 2 символи')
        .max(100, 'Максимум 100 символів')
        .required('ПІБ є обов\'язковим полем'),

    // 2. Email (Обов'язкове, RegEx для формату Email)
    email: Yup.string()
        .email('Неправильний формат Email')
        .required('Email є обов\'язковим полем'),

    // 3. Номер телефону (Обов'язкове, ТІЛЬКИ ЧИСЛА, RegEx для формату +380XXXXXXXXX)
    phone: Yup.string()
        .matches(
            /^(\+380|0)\d{9}$/, // RegEx: Починається з +380 або 0, далі 9 цифр
            "Неправильний формат телефону. Використовуйте 0XXXXXXXXX або +380XXXXXXXXX"
        )
        .required('Номер телефону є обов\'язковим полем'),

    // 4. Поштовий індекс (Обов'язкове, ТІЛЬКИ ЧИСЛА, не string)
    zipCode: Yup.number()
        .typeError('Поштовий індекс має бути числом')
        .integer('Поштовий індекс має бути цілим числом')
        .required('Поштовий індекс є обов\'язковим полем')
        .min(10000, 'Мінімум 5 цифр')
        .max(99999, 'Максимум 5 цифр'),

    // 5. Адреса доставки (Обов'язкове, валідація на спец. символи)
    address: Yup.string()
        .min(10, 'Мінімум 10 символів')
        // RegEx: Дозволяє літери, цифри, пробіли, коми, крапки та тире.
        .matches(
            /^[a-zA-Z0-9\s,.-]*$/,
            "Адреса містить неприпустимі символи"
        )
        .required('Адреса є обов\'язковим полем'),
});


const CheckoutPage = () => {
    const navigate = useNavigate();
    const { totalQuantity, totalPrice } = useSelector(state => state.cart);

    // Ініціалізація Formik
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            zipCode: '',
            address: '',
        },
        validationSchema: CheckoutSchema,
        onSubmit: (values) => {
            console.log('Дані замовлення:', values);

            navigate('/success');
        },
    });

    const isCartEmpty = totalQuantity === 0;

    // ФУНКЦІЯ ДЛЯ ВІДОБРАЖЕННЯ ВСІХ ПОМИЛОК

    const getAllErrors = () => {
        const errors = [];

        if (!formik.isSubmitting && !formik.submitCount) return errors;

        if (formik.errors.fullName) errors.push(`ПІБ: ${formik.errors.fullName}`);
        if (formik.errors.email) errors.push(`Email: ${formik.errors.email}`);
        if (formik.errors.phone) errors.push(`Телефон: ${formik.errors.phone}`);
        if (formik.errors.zipCode) errors.push(`Поштовий індекс: ${formik.errors.zipCode}`);
        if (formik.errors.address) errors.push(`Адреса: ${formik.errors.address}`);

        return errors;
    };

    const allErrors = getAllErrors();

    // РЕНДЕР КОМПОНЕНТА

    if (isCartEmpty) {
        return (
            <div className="app-global">
                <HeaderComponent activeTab="none" />
                <main className="container checkout-page-container">
                    <div className="empty-cart" style={{ textAlign: 'center', padding: '50px 0' }}>
                        <h1>Кошик порожній</h1>
                        <p>Для оформлення замовлення додайте товари до кошика.</p>
                        <Link to="/catalog">
                            <PrimaryButton>Перейти до каталогу</PrimaryButton>
                        </Link>
                    </div>
                </main>
                <FooterComponent />
            </div>
        );
    }

    return (
        <div className="app-global">
            <HeaderComponent activeTab="none" />
            <main className="container checkout-page-container">

                <h1>Оформлення замовлення</h1>

                <div className="checkout-grid">

                    <div className="checkout-form-block">
                        <h2>Контактні дані та доставка</h2>
                        <form onSubmit={formik.handleSubmit} className="checkout-form">

                            {/* Повідомлення про ВСІ помилки */}
                            {allErrors.length > 0 && (
                                <div className="form-error-summary">
                                    <p className="summary-title">Будь ласка, виправте наступні помилки:</p>
                                    <ul>
                                        {allErrors.map((err, index) => (
                                            <li key={index}><AlertTriangle size={14} style={{ marginRight: '5px' }} /> {err}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* 1. Full Name */}
                            <div className="form-group">
                                <label htmlFor="fullName">ПІБ</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fullName}
                                    className={formik.touched.fullName && formik.errors.fullName ? 'input-error' : ''}
                                />
                                <FormikError touched={formik.touched.fullName} error={formik.errors.fullName} />
                            </div>

                            {/* 2. Email */}
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
                                />
                                <FormikError touched={formik.touched.email} error={formik.errors.email} />
                            </div>

                            {/* 3. Phone */}
                            <div className="form-group">
                                <label htmlFor="phone">Телефон (наприклад, +380XXXXXXXXX)</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                    className={formik.touched.phone && formik.errors.phone ? 'input-error' : ''}
                                />
                                <FormikError touched={formik.touched.phone} error={formik.errors.phone} />
                            </div>

                            {/* 4. Числове поле */}
                            <div className="form-group">
                                <label htmlFor="zipCode">Поштовий індекс</label>
                                <input
                                    id="zipCode"
                                    name="zipCode"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.zipCode}
                                    className={formik.touched.zipCode && formik.errors.zipCode ? 'input-error' : ''}
                                />
                                <FormikError touched={formik.touched.zipCode} error={formik.errors.zipCode} />
                            </div>

                            {/* 5. Address */}
                            <div className="form-group full-width">
                                <label htmlFor="address">Адреса доставки</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows="3"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                    className={formik.touched.address && formik.errors.address ? 'input-error' : ''}
                                />
                                <FormikError touched={formik.touched.address} error={formik.errors.address} />
                            </div>

                            <PrimaryButton
                                type="submit"
                                className="submit-checkout-button"
                                disabled={formik.isSubmitting || isCartEmpty}
                            >
                                <ShoppingBag size={20} style={{ marginRight: '8px' }} />
                                Підтвердити замовлення ({totalPrice.toFixed(2)}$)
                            </PrimaryButton>
                        </form>
                    </div>

                    {/*Підсумок замовлення */}
                    <div className="checkout-summary-block">
                        <h2>Ваше замовлення</h2>
                        <p className="summary-line">
                            <span>Кількість товарів:</span>
                            <span className="summary-value">{totalQuantity}</span>
                        </p>
                        <p className="summary-line total-price">
                            <span>Загальна сума:</span>
                            <span className="summary-value">${totalPrice.toFixed(2)}</span>
                        </p>
                        <p className="summary-info">Перевірте уважно ваші дані перед підтвердженням.</p>
                    </div>

                </div>
            </main>
            <FooterComponent />
        </div>
    );
};

export default CheckoutPage;
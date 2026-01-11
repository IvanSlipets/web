import HeaderComponent from './components/layout/header/HeaderComponent';
import FooterComponent from './components/layout/footer/FooterComponent';
import PrimaryButton from './components/common/PrimaryButton';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './SuccessPage.css';

const SuccessPage = () => {
    return (
        <div className="app-global">
            <HeaderComponent activeTab="none" />
            <main className="container success-page-container">
                <div className="success-content">
                    <CheckCircle size={80} color="#28a745" />
                    <h1>Замовлення успішно оформлено!</h1>
                    <p>Ваше замовлення прийнято в обробку. Незабаром з вами зв'яжеться наш менеджер.</p>
                    <Link to="/">
                        <PrimaryButton>Повернутися на головну</PrimaryButton>
                    </Link>
                </div>
            </main>
            <FooterComponent />
        </div>
    );
};

export default SuccessPage;
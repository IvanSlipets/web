import Logo from "../../common/Logo";
import Navigation from "./Navigation";
import './Header.css'

const HeaderComponent = ({ activeTab }) => ( 
    <header className="header">
        <div className="header-content">
            <Logo />
            <Navigation activeTab={activeTab} /> 
        </div>
    </header>
);

export default HeaderComponent;
import "./FooterComponents.css";
import Logo from "../../common/Logo";
import SocialIcons from "../../common/SocialIcons";

const FooterComponent = () => (
    <footer className="footer">
        <div className="footer-top container-max-width"> 

            <div className="footer-branding-section">
                <h4 className="footer-branding-title">Title</h4>
                <p className="footer-branding-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo.
                </p>
            </div>

            <Logo />

            <SocialIcons />
        </div>

        <div className="container-max-width footer-copyright-section">
            2024 Мій Магазин © Усі права захищені.
        </div>
    </footer>
);

export default FooterComponent;
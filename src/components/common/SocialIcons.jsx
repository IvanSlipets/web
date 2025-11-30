import "./SocialIcons.css";
import { Facebook, Twitter, Linkedin, Users } from "react-feather";

const SocialIcons = () => {
    const icons = [
        { Icon: Facebook, color: '#3b5998' },
        { Icon: Twitter, color: '#00acee' },
        { Icon: Linkedin, color: '#0077b5' },
        { Icon: Users, color: '#db4a39' },
    ];

    return (
        <div className="social-icons-container">
            {icons.map(({ Icon, color }, index) => (
                <a
                    className="social-icon"
                    key={index}
                    href="#"
                    style={{ color: color }}
                >
                    <Icon size={18} />
                </a>
            ))}
        </div>
    );
};

export default SocialIcons;
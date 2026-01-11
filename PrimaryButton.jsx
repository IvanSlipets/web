import './PrimaryButton.css';

const PrimaryButton = ({ children, ...props }) => (
    <button className="primary-button" {...props}>
        {children}
    </button>
);

export default PrimaryButton;
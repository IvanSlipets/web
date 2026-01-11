// Select.jsx
import './Select.css';

const Select = ({ options, placeholder, onChange, value, ...props }) => (
    <select 
        className="custom-select" 
        onChange={(e) => onChange(e.target.value)}
        value={value} 
        {...props}
    >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
            <option key={index} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);

export default Select;
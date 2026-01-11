import { AlertTriangle } from 'lucide-react';

const FormikError = ({ touched, error }) => {
    if (touched && error) {
        return (
            <div 
                style={{ 
                    color: '#dc3545', 
                    fontSize: '12px', 
                    marginTop: '5px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <AlertTriangle size={14} style={{ marginRight: '5px' }} />
                {error}
            </div>
        );
    }
    return null;
};

export default FormikError;
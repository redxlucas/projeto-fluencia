// import { useState } from 'react';

function InputBox({label, placeholder = '', onChange }) {
    // const [value, setValue] = useState('');

    // const handleChange = (e) => {
    //     const newValue = e.target.value;
    //     setValue(newValue);
    //     if (onChange) onChange(newValue);
    // };

    return (
        <div style={{ marginBottom: '1rem' }}>
            {label && <label>{label}</label>}
            <input
                type="text"
                // value={value}
                // onChange={handleChange}
                placeholder={placeholder}    
            />
        </div>
    );
}

export default InputBox;
export const Input = ({
    type = 'text',
    value,
    onChange,
    placeholder = '',
    name,
    className = '',
    ...props
}) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-2 text-lg border border-gray-300 rounded-full ${className}`}
            {...props}
        />
    )
}

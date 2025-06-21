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
            className={`w-full px-4 py-2 text-sm border border-gray-300 rounded-full ${className}`}
            {...props}
        />
    )
}

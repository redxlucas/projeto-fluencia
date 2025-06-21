export function Button({ children, className = '', ...props }) {
    return (
        <button
            className={`bg-primary text-white py-2 px-4 rounded-full hover:bg-primary transition cursor-pointer ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}


export function Button({ children, className = '', ...props }) {
    return (
        <button
            className={`bg-purple-700 text-white py-2 px-4 rounded-full hover:bg-purple-800 transition cursor-pointer ${className}`}
            {...props}
        >
            {children}
            
        </button>
    )
}

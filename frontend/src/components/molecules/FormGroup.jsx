export const FormGroup = ({ label, children }) => {
    return (
        <div className="flex flex-col gap-1 text-left">
            {label && <label className="text-sm font-medium">{label}</label>}
            {children}
        </div>
    )
}

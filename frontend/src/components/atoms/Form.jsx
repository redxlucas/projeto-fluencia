export function Form({ onSubmit, children }) {
    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col space-y-4"
            noValidate
            autoComplete="off"
        >
            {children}
        </form>
    )
}

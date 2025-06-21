import { AlertTriangle } from 'lucide-react'

export function AlertBox({ message }) {
    return (
        <div className="flex items-center gap-3 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-md shadow-sm">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm font-medium">{message}</p>
        </div>
    )
}

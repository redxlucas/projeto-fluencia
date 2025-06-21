import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { AlertTriangle } from 'lucide-react'

export function SessionInvalidAlert({ open, onClose }) {
    return (
        <AlertDialog.Root open={open} onOpenChange={onClose}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                <AlertDialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-white rounded-md p-6 shadow-lg -translate-x-1/2 -translate-y-1/2 focus:outline-none">
                    <div className="flex items-center gap-3 text-red-600 mb-4">
                        <AlertTriangle size={24} />
                        <AlertDialog.Title className="text-lg font-semibold">
                            Sessão Inválida
                        </AlertDialog.Title>
                    </div>
                    <AlertDialog.Description className="mb-4 text-gray-700">
                        A sessão informada é inválida ou já foi encerrada. Você
                        será redirecionado em breve.
                    </AlertDialog.Description>
                    <div className="flex justify-end">
                        <AlertDialog.Cancel
                            className="inline-flex items-center justify-center px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                            onClick={onClose}
                        >
                            Fechar
                        </AlertDialog.Cancel>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}

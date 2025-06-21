import { Binary } from 'lucide-react'
import { CustomTooltip } from './CustomTooltip'

export const BytesDisplay = ({ points = 0 }) => {
    return (
        <>
            <CustomTooltip 
                icon={<Binary size={18} className="text-primary" />}
                text={points}
                tooltip="Bytes acumulados"
            />
        </>
    )
}

import React from 'react'
import { Binary } from 'lucide-react'
import { Tooltip } from 'radix-ui'
import { CustomTooltip } from './CustomTooltip'

export const BytesDisplay = ({ points = 0 }) => {
    return (
        <>
            <CustomTooltip 
                icon={<Binary size={18} className="text-purple-700" />}
                text={points}
                tooltip="Bytes acumulados"
            />
        </>
    )
}

import React from 'react'
import { Binary } from 'lucide-react'
import { Tooltip } from 'radix-ui'

export const BytesDisplay = ({ points = 0 }) => {
    return (
        <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <span className="flex items-center gap-1 whitespace-nowrap">
                        <Binary size={18} className="text-purple-700" />
                        {points}
                    </span>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className="bg-black text-white px-2 py-1 rounded text-xs shadow-lg"
                        side="top"
                        sideOffset={4}
                    >
                        Bytes Acumulados
                        <Tooltip.Arrow className="fill-black" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}

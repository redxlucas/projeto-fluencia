import { Tooltip } from 'radix-ui'

export const CustomTooltip = ({ icon, text, tooltip, className = '' }) => {
    return (
        <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <span className={`flex items-center gap-1 whitespace-nowrap cursor-default ${className}`}>
                        {icon}
                        {text}
                    </span>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className="bg-black text-white px-2 py-1 rounded text-xs shadow-lg"
                        side="top"
                        sideOffset={4}
                    >
                        {tooltip}
                        <Tooltip.Arrow className="fill-black" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}


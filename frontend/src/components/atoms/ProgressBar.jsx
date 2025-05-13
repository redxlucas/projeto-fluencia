import * as Progress from '@radix-ui/react-progress'

export function ProgressBar({ progress }) {

    return (
        <div className="w-full">
            <Progress.Root value={progress} max={100} className="bg-gray-300 h-2">
                <Progress.Indicator
                    className="bg-purple-700 h-2 rounded-e-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </Progress.Root>
        </div>
    )
}

interface IconProps {
    className?: string;
}

export function EditIcon({ className = "h-5 w-5" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
    );
}

export function DeleteIcon({ className = "h-5 w-5" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function CloseIcon({ className = "h-6 w-6" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
}

export function PlusIcon({ className = "h-5 w-5" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function WarningIcon({ className = "h-6 w-6" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
        </svg>
    );
}

export function LoadingSpinner({ className = "h-4 w-4" }: IconProps) {
    return (
        <div
            className={`border-2 border-current border-t-transparent rounded-full animate-spin ${className}`}
        />
    );
}
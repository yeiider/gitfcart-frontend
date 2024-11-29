import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Check, XCircle, Info } from "lucide-react";

export default function AlertComponent ({ message, variant }: { message: string; variant: 'success' | 'error' | 'info' | null }) {
    if (!message || !variant) return null;

    let icon;
    switch (variant) {
        case 'success':
            icon = <Check className="h-4 w-4 text-green-500" />;
            break;
        case 'error':
            icon = <XCircle className="h-4 w-4 text-red-500" />;
            break;
        case 'info':
            icon = <Info className="h-4 w-4 text-blue-500" />;
            break;
    }

    return (
        <Alert variant={variant==="error" ? "destructive" : "default"}>
            {icon}
            <AlertTitle>{variant === 'success' ? 'Éxito' : variant === 'error' ? 'Error' : 'Información'}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
};

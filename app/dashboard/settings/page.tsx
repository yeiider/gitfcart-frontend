import {AuthProvider} from "@/app/context/AuthContext";
import SettingsProfileView from "@/app/dashboard/settings/profile";

export default function SettingsPage() {
    return (
        <AuthProvider>
            <SettingsProfileView/>
        </AuthProvider>
    )
}


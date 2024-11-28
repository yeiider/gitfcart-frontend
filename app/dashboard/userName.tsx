import {User} from "lucide-react";
import {useAuth} from "@/app/context/AuthContext";

export default function UserName(){
    const { user, setUser } = useAuth();
    return(
        <>
            {user &&
                <div className="p-6 border-b">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-primary"/>
                        </div>
                        <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                                {user.lastName}
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
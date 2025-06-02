import { useRouter } from "next/router";
import { auth } from "~/server/auth";
import type { UserRole } from "~/server/auth/config";
import { useEffect } from "react";

export function ProtectedRoute({ children, allowedRoles }: 
    { children: React.ReactNode, allowedRoles: UserRole[] }) {
    const router = useRouter();
    
    useEffect(() => {
        async function checkAuth() {
            const session = await auth();
            if (!session?.user?.role) {
                void router.push("/unauthorized");
                return;
            }
            const userRole = session.user.role;
            if (!allowedRoles.includes(userRole)) {
                void router.push("/unauthorized");
            }
        }
        
        void checkAuth();
    }, [router, allowedRoles]);

    return <>{children}</>;
};
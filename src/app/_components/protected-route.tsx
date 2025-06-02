import { useRouter } from "next/router";
import { auth } from "~/server/auth";
import type { UserRole } from "~/server/auth/config";

const ProtectedRoute = async ({ children, allowedRoles }: 
    { children: React.ReactNode, allowedRoles: UserRole[] }) => {
    const router = useRouter();
    const session = await auth();
    const userRole = session?.user?.role as UserRole;
    if (!allowedRoles.includes(userRole)) {
        router.push("/unauthorized");
        return null;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
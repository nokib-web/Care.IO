import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    if (session.user.role === "admin") {
        redirect("/admin/dashboard");
    } else {
        redirect("/user/dashboard");
    }

    // Fallback?
    return <div>Redirecting...</div>;
};

export default DashboardPage;

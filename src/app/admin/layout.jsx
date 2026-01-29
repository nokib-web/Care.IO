import DashboardSidebar from "@/components/layouts/DashboardSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        redirect("/login");
    }

    const links = [
        { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
        { label: "Live Support", href: "/admin/chat", icon: "💬" },
    ];

    return (
        <DashboardSidebar title="Admin Panel" links={links} user={session.user}>
            {children}
        </DashboardSidebar>
    );
}

import DashboardSidebar from "@/components/layouts/DashboardSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserLayout({ children }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const links = [
        { label: "Overview", href: "/user/dashboard", icon: "🏠" },
        { label: "My Bookings", href: "/user/bookings", icon: "📅" },
        { label: "Book New Service", href: "/all-services", icon: "➕" },
    ];

    return (
        <DashboardSidebar title="User Portal" links={links} user={session.user}>
            {children}
        </DashboardSidebar>
    );
}

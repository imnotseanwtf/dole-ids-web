import { Head } from '@inertiajs/react';
import { ListFilter, MoreVertical, Search, UserPlus } from 'lucide-react';
import PageHeading from '@/components/admin/page-heading';

type Role = 'Admin' | 'Central' | 'Provincial';

const users: { name: string; email: string; role: Role; province: string; lastActive: string; added: string }[] = [
    { name: 'Flavio Deza', email: 'fdeza@gmail.com', role: 'Admin', province: 'LAGUNA', lastActive: 'Apr 10, 2026', added: 'Mar 10, 2026' },
    { name: 'Flavio Deza II', email: 'fdeza@gmail.com', role: 'Admin', province: 'LAGUNA', lastActive: 'Apr 10, 2026', added: 'Mar 10, 2026' },
    { name: 'Flavio Deza III', email: 'fdeza@gmail.com', role: 'Central', province: 'LAGUNA', lastActive: 'Apr 10, 2026', added: 'Mar 10, 2026' },
    { name: 'Flavio Deza IV', email: 'fdeza@gmail.com', role: 'Central', province: 'LAGUNA', lastActive: 'Apr 10, 2026', added: 'Mar 10, 2026' },
    { name: 'Flavio Deza V', email: 'fdeza@gmail.com', role: 'Central', province: 'LAGUNA', lastActive: 'Apr 10, 2026', added: 'Mar 10, 2026' },
    { name: 'Flavio Deza VI', email: 'fdeza@gmail.com', role: 'Provincial', province: 'BATANGAS', lastActive: 'Apr 10, 2026', added: 'Mar 10, 2026' },
    { name: 'Flavio Deza VII', email: 'fdeza@gmail.com', role: 'Provincial', province: 'CAVITE', lastActive: 'Apr 10, 2026', added: 'Mar 10, 2026' },
    { name: 'Flavio Deza VIII', email: 'fdeza@gmail.com', role: 'Provincial', province: 'QUEZON', lastActive: 'Apr 10, 2026', added: 'Mar 10, 2026' },
    { name: 'Flavio Deza IX', email: 'fdeza@gmail.com', role: 'Provincial', province: 'RIZAL', lastActive: 'Apr 10, 2026', added: 'Mar 10, 2026' },
];

const roleStyle: Record<Role, string> = {
    Admin: 'bg-[#eff4fb] text-[#4784ff]',
    Central: 'bg-[#eaffe4] text-[#26b002]',
    Provincial: 'bg-[#e2edff] text-[#4784ff]',
};

export default function AdminUsers() {
    return (
        <>
            <Head title="User Management" />

            <PageHeading title="User Management" subtitle="Manage your users here" />

            <h2 className="mb-4 border-b border-[#5e5e5e]/20 pb-3 text-[18px] font-bold text-[#1f1f1f]">
                All users <span className="text-[#616162]/70">9</span>
            </h2>

            <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-72 items-center gap-2 rounded-full bg-white px-4 shadow-sm">
                    <Search className="size-4 text-[#5e5e5e]/60" />
                    <input
                        className="w-full bg-transparent text-[12px] text-[#5e5e5e] placeholder:text-[#5e5e5e]/60 focus:outline-none"
                        placeholder="Search"
                    />
                </div>
                <button className="ml-auto flex h-9 items-center gap-2 rounded-full bg-[#4784ff] px-4 text-[12px] font-medium text-white">
                    <UserPlus className="size-4" />
                    Add User
                </button>
                <button className="flex size-9 items-center justify-center rounded-md bg-white shadow-sm">
                    <ListFilter className="size-4 text-[#5e5e5e]" />
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#5e5e5e]/15 bg-white">
                <table className="w-full text-left text-[12px] text-[#5e5e5e]">
                    <thead>
                        <tr className="bg-[#f6f6f6] text-[10px] font-medium">
                            <th className="px-5 py-3 font-medium">User</th>
                            <th className="font-medium">Role</th>
                            <th className="font-medium">Province</th>
                            <th className="font-medium">Last active</th>
                            <th className="font-medium">Date added</th>
                            <th className="pr-5" />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, i) => (
                            <tr key={i} className="border-t border-[#5e5e5e]/10 hover:bg-[#f6f6f6]/60">
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="size-8 rounded-full bg-[#e2e2e2]" />
                                        <div>
                                            <p className="font-semibold text-[#1f1f1f]">{u.name}</p>
                                            <p className="text-[10px] text-[#616162]/70">{u.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`rounded-full px-3 py-0.5 text-[11px] font-medium ${roleStyle[u.role]}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td>{u.province}</td>
                                <td>
                                    <p>{u.lastActive}</p>
                                    <p className="text-[10px] text-[#616162]/60">3:34 PM</p>
                                </td>
                                <td>{u.added}</td>
                                <td className="pr-5">
                                    <button>
                                        <MoreVertical className="size-4 text-[#5e5e5e]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

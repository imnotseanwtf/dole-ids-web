import { Head, Link } from '@inertiajs/react';
import { ClipboardList, Package } from 'lucide-react';

// ponytail: the Figma Home is a full-bleed hero photo we don't have the asset
// for — using a gradient placeholder + CTAs. Drop the real image in when available.
export default function ProvincialHome() {
    return (
        <div className="relative flex min-h-[calc(100vh-57px)] items-center justify-center overflow-hidden bg-gradient-to-br from-[#eef3fb] to-[#dfe7f3]">
            <Head title="Home" />

            <div className="max-w-xl px-6 text-center">
                <h1 className="text-[32px] font-bold text-[#1f3a5f]">Welcome to DOLE Supply Management</h1>
                <p className="mt-3 text-[14px] text-[#5e5e5e]">
                    Browse the supply catalog, submit requests, and track your deliveries — all in one place.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                    <Link
                        href="/provincial/catalog"
                        className="flex items-center gap-2 rounded-md bg-[#4784ff] px-5 py-2.5 text-[13px] font-medium text-white"
                    >
                        <Package className="size-4" /> Browse Supply Catalog
                    </Link>
                    <Link
                        href="/provincial/requests"
                        className="flex items-center gap-2 rounded-md border border-[#4784ff]/40 bg-white px-5 py-2.5 text-[13px] font-medium text-[#4784ff]"
                    >
                        <ClipboardList className="size-4" /> My Requests
                    </Link>
                </div>
            </div>
        </div>
    );
}

import { Head } from '@inertiajs/react';
import { Wrench } from 'lucide-react';
import PageHeading from '@/components/admin/page-heading';

// ponytail: no Figma design for System yet — placeholder so the nav doesn't 404.
export default function AdminSystem() {
    return (
        <>
            <Head title="System" />

            <PageHeading title="System" subtitle="System configuration" />

            <div className="flex h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-[#5e5e5e]/25 bg-white text-[#616162]/60">
                <Wrench className="size-10" strokeWidth={1.25} />
                <p className="mt-3 text-[13px]">System — design pending</p>
            </div>
        </>
    );
}

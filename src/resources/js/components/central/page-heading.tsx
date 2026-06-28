import { useEffect, useState } from 'react';

function usePhilippineTime() {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);

        return () => clearInterval(id);
    }, []);

    return now.toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

export default function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
    const time = usePhilippineTime();

    return (
        <header className="mb-6 flex items-start justify-between">
            <div>
                <h1 className="text-xl font-bold text-[#5e5e5e]">{title}</h1>
                <p className="text-[10px] text-[#616162]/75">{subtitle}</p>
            </div>
            <p className="text-right text-[12px] text-[#5e5e5e]">
                Philippine Standard Time:
                <br />
                {time}
            </p>
        </header>
    );
}

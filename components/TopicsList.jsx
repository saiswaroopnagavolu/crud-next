// "use client";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencil } from 'react-icons/hi';

const getTopics = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/topics', {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }
        return res.json();
    } catch (error) {
        console.error("Error loading topics:", error);
        return { topics: [] }; 
    }
}

export default async function Topicslist() {
    const { topics } = await getTopics();

    if (!topics || topics.length === 0) {
        return <div>No topics available.</div>;
    }

    return (
        <>
            {topics.map(t => (
                <div key={t._id} className="flex justify-between items-start p-4 border border-slate-300 my-3 gap-5">
                    <div>
                        <h2 className="font-bold text-2xl">{t.title}</h2>
                        <div>{t.description}</div>
                    </div>
                    <div className="flex gap-2">
                        <RemoveBtn id={t._id} />
                        <Link href={`/editTopic/${t._id}`}>
                            <HiPencil size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}

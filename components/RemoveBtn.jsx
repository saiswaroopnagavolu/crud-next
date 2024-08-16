"use client";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";
import { useState } from "react";

export default function RemoveBtn({ id }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const removeTopic = async () => {
        const confirmed = confirm("Are you sure?");
        if (confirmed) {
            setIsDeleting(true); 
            try {
                const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
                    method: "DELETE",
                });
                if (res.ok) {
                    router.refresh();
                } else {
                    throw new Error("Failed to delete the topic");
                }
            } catch (error) {
                console.error("Error deleting topic:", error);
                // Optionally display an error message to the user
            } finally {
                setIsDeleting(false); // Re-enable the button after deletion attempt
            }
        }
    };

    return (
        <button 
            onClick={removeTopic} 
            className={`text-red-400 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isDeleting}
        >
            <HiOutlineTrash size={24} />
        </button>
    );
}

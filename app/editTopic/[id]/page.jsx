import EditTopicForm from "@/components/EditTopicForm"; // Note the capitalization

const getTopicById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch topic");
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching topic:", error);
        return null; // Return null or handle the error as needed
    }
};

export default async function EditTopicPage({ params }) {
    const { id } = params;
    const topic = await getTopicById(id);

    if (!topic) {
        return (
            <div className="error-message">
                <p>There was an error loading the topic. Please try again later.</p>
                {/* You could add a retry button or link to go back */}
                <a href="/" className="text-blue-500">Go back to home</a>
            </div>
        ); // Handle the error in the UI
    }

    const { title, description } = topic;

    console.log("id:", id);
    return <EditTopicForm id={id} title={title} description={description} />;
}

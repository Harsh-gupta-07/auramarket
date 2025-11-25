export async function distinctCategories() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/distinct-categories`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        return data;
    } catch (err) {
        throw err
    }
}
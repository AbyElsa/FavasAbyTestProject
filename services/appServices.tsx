const API_URL =
    "https://script.google.com/macros/s/AKfycbxo4ioC9FvuKhv3tm3qcxHDuMIjO42AajJgssWGxpNqJSYtqeEXghpWShDF6i_rlZdEeA/exec";

export const getSummaries = async () => {
    try {
        const response = await fetch(`${API_URL}?action=getSummaries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching summaries:", error);
        throw error;
    }
};

export const getDetailsBySummaryIds = async (summaryIds: any) => {
    try {
        const ids = Array.isArray(summaryIds)
            ? summaryIds.join(",")
            : summaryIds;

        const response = await fetch(
            `${API_URL}?action=getDetailsBySummaryIds&summaryIds=${encodeURIComponent(
                ids
            )}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching details:", error);
        throw error;
    }
};

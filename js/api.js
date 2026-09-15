"use strict";

const api = {
    async activateDisasterRecovery() {
        const response = await fetch(
            `${CONFIG.API_BASE_URL}/disaster`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            }
        );

        let data;

        try {
            data = await response.json();
        } catch (error) {
            throw new Error("Server returned an invalid response.");
        }

        if (!response.ok) {
            throw new Error(
                data.message || `Request failed: HTTP ${response.status}`
            );
        }

        return data;
    }
};
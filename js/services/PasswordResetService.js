const API_URL = "http://localhost:8081/password";

export default class PasswordResetService {
    static async requestPasswordReset(email) {
        const response = await fetch(`${API_URL}/request-reset?email=${email}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    }

    static async resetPassword(token, newPassword) {
        const response = await fetch(`${API_URL}/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, newPassword }),
        });

        return response;
    }
}



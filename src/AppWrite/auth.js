import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client;
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.VITE_APPWRITE_URL)
            .setProject(conf.VITE_APPWRITE_PROJECT_ID);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount ? this.login({ email, password }) : userAccount;
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
            throw error;
        }
    }

    async getUserDetails() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("AuthService :: getUserDetails :: error", error);
            return null; // Return `null` instead of throwing to handle the absence of user gracefully.
        }
    }
}

const authService = new AuthService();
export default authService;

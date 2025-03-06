// import { Client, Account, ID } from "appwrite";
// import conf from "../config/config";

// export class AuthService {
//     client;
//     account;

//     constructor() {
//         this.client = new Client()
//             .setEndpoint(conf.APPWRITE_URL)
//             .setProject(conf.APPWRITE_PROJECT_ID);
//         this.account = new Account(this.client);
//     }

//     async createAccount({ email, password, name }) {
//         try {
//             const userAccount = await this.account.create(ID.unique(), email, password, name);
//             return userAccount ? this.login({ email, password }) : userAccount;
//         } catch (error) {
//             console.error("AuthService :: createAccount :: error", error);
//             return { error: error.message };
//         }
//     }

//     async login({ email, password }) {
//         try {
//             return await this.account.createEmailPasswordSession(email, password);
//         } catch (error) {
//             console.error("AuthService :: login :: error", error);
//             return { error: error.message };
//         }
//     }

//     async logout() {
//         try {
//             await this.account.deleteSessions();
//             return { success: true };
//         } catch (error) {
//             console.error("AuthService :: logout :: error", error);
//             return { error: error.message };
//         }
//     }

//     async getUserDetails() {
//         try {
//             return await this.account.get();
//         } catch (error) {
//             console.error("AuthService :: getUserDetails :: error", error);
//             return  false||{ error: error.message };

//         }
//     }
// }

// const authService = new AuthService();
// export default authService;



import conf from "../config/config";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.APPWRITE_PROJECT_ID);
        this.account = new Account(this.client);

    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getUserDetails() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService
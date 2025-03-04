import conf from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.APPWRITE_ENDPOINT);
        this.client.setProject(conf.APPWRITE_PROJECT_ID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.VITE_APPWRITE_COLLECTION_ID,
                slug,
                { title, slug, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.error("Error creating post:", error.message);
            throw new Error(`Failed to create post: ${error.message}`);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.VITE_APPWRITE_COLLECTION_ID,
                slug,
                { title, slug, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.error("Error updating post:", error.message);
            throw new Error(`Failed to update post: ${error.message}`);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.VITE_APPWRITE_COLLECTION_ID,
                slug
            );
        } catch (error) {
            console.error("Error deleting post:", error.message);
            throw new Error(`Failed to delete post: ${error.message}`);
        }
    }
}

const serviceInstance = new Service();
export default serviceInstance;

import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../config/config";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.APPWRITE_URL);
        this.client.setProject(conf.APPWRITE_PROJECT_ID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug,
                { title, slug, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.error("Error creating post:", error.message);
            return { error: `Failed to create post: ${error.message}` };
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, }) {
        try {
            return await this.databases.updateDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            console.error("Error updating post:", error.message);
            return { error: `Failed to update post: ${error.message}` };
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug
            );
            return { success: true };
        } catch (error) {
            console.error("Error deleting post:", error.message);
            return { error: `Failed to delete post: ${error.message}` };
        }
    }

    async getDocument(slug) {
        try {
            return await this.databases.getDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug
            );
        } catch (error) {
            console.error("Error fetching post:", error);
            return { error: `Failed to fetch post: ${error}` };
        }
    }

    async getAllPosts(query = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                query
            );
        } catch (error) {
            console.error("Error fetching all posts:", error);
            return { error: `Failed to fetch all posts: ${error}` };
        }
    }

    // File Upload
    async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
                conf.APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            );
            return response; // Return file object instead of URL
        } catch (error) {
            console.error("Error uploading file:", error.message);
            return { error: `Failed to upload file: ${error.message}` };
        }
    }

    // Delete File
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.APPWRITE_BUCKET_ID, fileId);
            return { success: true };
        } catch (error) {
            console.error("Error deleting file:", error.message);
            return { error: `Failed to delete file: ${error.message}` };
        }
    }

    // File Preview
    async filePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.APPWRITE_BUCKET_ID, fileId);
        } catch (error) {
            console.error("Error fetching file preview:", error);
            return { error: `Failed to fetch file preview: ${error}` };
        }
    }
}

const serviceInstance = new Service();
export default serviceInstance;

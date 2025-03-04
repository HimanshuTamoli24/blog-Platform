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
    async getDocument(slug) {
        try {
            return await this.databases.getDocument(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.VITE_APPWRITE_COLLECTION_ID,
                slug
            );

        } catch (error) {
            console.error("Error fetching post:", error.message);
            throw new Error(`Failed to fetch post: ${error.message}`);

        }
    }
    async getAllPosts(
        query = [
            Query.equal("status", "active")
        ]
    ) {
        try {
            return await this.databases.listDocuments(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.VITE_APPWRITE_COLLECTION_ID,
                {
                    query,
                    limit: 100,
                }
            );
        } catch (error) {
            console.error("Error fetching all posts:", error.message);
            throw new Error(`Failed to fetch all posts: ${error.message}`);
        }

    }
    //file upload
    async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
                conf.VITE_APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            );
            return response.url;
        } catch (error) {
            console.error("Error uploading file:", error.message);
            throw new Error(`Failed to upload file: ${error.message}`);
        }
    }
    // delete file upload
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.VITE_APPWRITE_BUCKET_ID, fileId);
        } catch (error) {
            console.error("Error deleting file:", error.message);
            throw new Error(`Failed to delete file: ${error.message}`);
        }
    }

    filePreview(fileId) {
        try {
            const response = this.bucket.getFilePreview(conf.VITE_APPWRITE_BUCKET_ID, fileId);
            return response.url;
        } catch (error) {
            console.error("Error fetching file preview:", error.message);
            throw new Error(`Failed to fetch file preview: ${error.message}`);
        }
    }

}

const serviceInstance = new Service();
export default serviceInstance;

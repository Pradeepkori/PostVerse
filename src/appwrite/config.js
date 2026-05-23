import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

const profilesCollectionId =
  import.meta.env.VITE_APPWRITE_PROFILES_COLLECTION_ID

const likesCollectionId =
  import.meta.env.VITE_APPWRITE_LIKES_COLLECTION_ID

const commentsCollectionId =
  import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID


export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId, username, userDp}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    username,
                    userDp
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, username}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    username
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        ).toString();
    }

    async likePost(postId, userId, username) {

    try {

        // check existing like

        const existingLike =
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                likesCollectionId,
                [
                    Query.equal("postId", postId),
                    Query.equal("userId", userId)
                ]
            )

        // if already liked -> unlike

        if (existingLike.documents.length > 0) {

            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                likesCollectionId,
                existingLike.documents[0].$id
            )

            return {
                liked: false
            }
        }

        // otherwise create like

        await this.databases.createDocument(
            conf.appwriteDatabaseId,
            likesCollectionId,
            ID.unique(),
            {
                postId,
                userId,
                username
            }
        )

        return {
            liked: true
        }

    } catch (error) {

        console.log(
            "Appwrite service :: likePost :: error",
            error
        )
    }
}

    async getLikes(postId) {

    return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        likesCollectionId,
        [
        Query.equal("postId", postId)
        ]
    )
    }

    async getLikedUsers(postId) {

    try {

        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            likesCollectionId,
            [
                Query.equal("postId", postId)
            ]
        )

    } catch (error) {

        console.log(error)

    }
}

    async addComment(postId, userId, username, comment) {

    return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        commentsCollectionId,
        ID.unique(),
        {
        postId,
        userId,
        username,
        comment
        }
    )
    }

    async getComments(postId) {

    return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        commentsCollectionId,
        [
        Query.equal("postId", postId)
        ]
    )
    }

    async createUserProfile({ userId, username, userDp }) {
        try {

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfilesCollectionId,
                ID.unique(),
                {
                    userId,
                    username,
                    userDp
                }
            )

        } catch (error) {

            console.log(
                "Appwrite service :: createUserProfile :: error",
                error
            )

        }

    }

    async createOrUpdateProfile(userId, username, userDp) {
        try {
            const existingProfile =
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                profilesCollectionId,
                [
                    Query.equal("userId", userId)
                ]
            )

            // update existing profile
            
            if (existingProfile.documents.length > 0) {
                
                return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                profilesCollectionId,
                existingProfile.documents[0].$id,
                    {
                        username,
                        userDp
                    }
                )
            }

           // create new profile

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                profilesCollectionId,
                ID.unique(),
                {
                    userId,
                    username,
                    userDp
                }
            )

        } catch (error) {
            console.log(error)
        }
    }

    async getUserProfile(userId) {
        try {
            const response =
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                profilesCollectionId,
                [
                    Query.equal("userId", userId)
                ]
            )

        return response.documents[0]

        } catch (error) {
            
            console.log(error)
        }
    }

}

const service = new Service()
export default service
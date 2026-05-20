import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((result) => {
      if (result && result.documents) {
        setPosts(result.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="w-full">
              <PostCard 
                $id={post.$id} 
                title={post.title} 
                featuredImage={post.featuredImage}
                username={post.username}
                userId={post.userId}
              />

            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

import React, { useEffect, useState } from "react";
import { PostType } from "../types/PostType";
import PostComponent from "./PostComponent";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const DashboardPage: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<PostType, "id">), // Omit 'id' from PostType when spreading
        }));
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
};

export default DashboardPage;

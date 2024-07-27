import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { PostType } from "../types/PostType"; // Ensure Post type is correctly imported
import "../styles/styles.css";

const LandingPage: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollection);

        const postsList: PostType[] = postsSnapshot.docs.map((doc) => ({
          id: doc.id, // Unique identifier
          ...(doc.data() as Omit<PostType, "id">), // Spread data without 'id'
        }));

        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="landing-page">
      {/* Render your posts here */}
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2 className="post__title">{post.title}</h2>
          <p className="post__content">{post.content}</p>
          {/* Display other post properties */}
        </div>
      ))}
    </div>
  );
};

export default LandingPage;

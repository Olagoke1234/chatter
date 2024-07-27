import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { PostType } from "../types/PostType"; // Ensure this path is correct
import "../styles/styles.css";

const DashboardPage: React.FC = () => {
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const userId = "some-user-id"; // Replace with actual user ID

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, where("userId", "==", userId));
        const postsSnapshot = await getDocs(q);

        const postsList: PostType[] = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<PostType, "id">),
        }));

        setUserPosts(postsList);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <div className="dashboard-page">
      {userPosts.map((post) => (
        <div key={post.id} className="post">
          <h2 className="post__title">{post.title}</h2>
          <p className="post__content">{post.content}</p>
          {/* Display other post properties */}
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;

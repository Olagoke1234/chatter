import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import PostComponent from "../components/PostComponent";
import "../styles/styles.css";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const postDoc = doc(db, "posts", id);
          const postSnapshot = await getDoc(postDoc);
          if (postSnapshot.exists()) {
            setPost(postSnapshot.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div className="post-page">
      <h1 className="post-page__title">Post Page</h1>
      {post ? (
        <PostComponent post={post} />
      ) : (
        <p className="post-page__loading">Loading...</p>
      )}
    </div>
  );
};

export default PostPage;

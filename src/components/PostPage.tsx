import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import PostComponent from "./PostComponent";
import "../styles/styles.css";
import { PostType } from "../types/PostType";

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const docRef = doc(db, "posts", postId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPost({
              id: docSnap.id,
              ...(docSnap.data() as Omit<PostType, "id">),
            });
          } else {
            setError("No such document!");
          }
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      }
    };

    fetchPost();
  }, [postId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-page">
      <PostComponent post={post} />
    </div>
  );
};

export default PostPage;

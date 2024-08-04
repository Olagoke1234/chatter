import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import PostComponent from "./PostComponent";

interface PostContent {
  type: "text" | "video" | "audio" | "image";
  content: string;
}

interface Post {
  id: string;
  title: string;
  content: PostContent[];
}

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as Post);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-page">
      <PostComponent title={post.title} content={post.content} />
    </div>
  );
};

export default PostPage;

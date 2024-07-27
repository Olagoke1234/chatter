// src/components/PostComponent.tsx
import React from "react";
import "../styles/styles.css";

interface PostProps {
  post: {
    id: string;
    content: string;
    author: string;
    timestamp: any;
    likes: number;
    comments: any[];
  };
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="post">
      <h2>{post.author}</h2>
      <p>{post.content}</p>
      <p>{new Date(post.timestamp.seconds * 1000).toLocaleString()}</p>
      <p>Likes: {post.likes}</p>
      <div>
        <h3>Comments:</h3>
        {post.comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default PostComponent;

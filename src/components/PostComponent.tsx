import React, { useState, useEffect } from "react";
import { PostType, ContentItem } from "../types/PostType";
import { db } from "../firebaseConfig";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

interface PostComponentProps {
  post: PostType;
}

const PostComponent: React.FC<PostComponentProps> = ({ post }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    const postRef = doc(db, "posts", post.id);

    // Listen for real-time updates to comments and likes
    const unsubscribe = onSnapshot(postRef, (doc) => {
      const data = doc.data() as PostType;
      if (data) {
        setComments(data.comments);
        setLikes(data.likes);
      } else {
        console.error("No data found for post:", post.id);
      }
    });

    // Clean up listener on component unmount
    return () => unsubscribe();
  }, [post.id]);

  const handleLikeClick = async () => {
    try {
      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, { likes: likes + 1 });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const postRef = doc(db, "posts", post.id);
        const updatedComments = [
          ...comments,
          { author: "Current User", text: newComment },
        ];
        await updateDoc(postRef, { comments: updatedComments });
        setNewComment("");
      } catch (error) {
        console.error("Error updating comments:", error);
      }
    }
  };

  // Function to convert YouTube URL to embed URL
  const convertToEmbedUrl = (videoUrl: string) => {
    const videoIdMatch =
      videoUrl.match(
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^\s&]+)/
      ) || videoUrl.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^\s&]+)/);

    const videoId = videoIdMatch ? videoIdMatch[1] : "";
    if (!videoId) {
      console.error("Invalid YouTube URL, could not extract videoId");
      return ""; // Return empty string if videoId could not be extracted
    }

    console.log("Converting videoUrl:", videoUrl); // Log videoUrl to ensure it's valid
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="post-item">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-content">
        {post.content.map((item: ContentItem, index: number) => {
          console.log("Rendering item:", item); // Debugging log
          switch (item.type) {
            case "text":
              const textContent = item.content?.trim(); // Access `content` property
              console.log("Text Content:", textContent); // Debugging log
              return textContent ? <p key={index}>{textContent}</p> : null;
            case "image":
              return item.imageUrl ? (
                <img key={index} src={item.imageUrl} alt="Post content" />
              ) : null;
            case "video":
              const videoEmbedUrl = convertToEmbedUrl(item.content);
              console.log("Video Embed URL:", videoEmbedUrl); // Debugging log
              return videoEmbedUrl ? (
                <div key={index} className="video-container">
                  <iframe
                    src={videoEmbedUrl}
                    title="YouTube video"
                    frameBorder="0"
                    allowFullScreen
                    width="100%"
                    height="auto"
                  ></iframe>
                </div>
              ) : null;
            case "audio":
              return item.audioUrl ? (
                <audio key={index} controls>
                  <source src={item.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : null;
            default:
              return null;
          }
        })}
      </div>
      <div className="post-footer">
        <button className="like-button" onClick={handleLikeClick}>
          <i className="fas fa-thumbs-up"></i> {likes} Likes
        </button>
        <div className="post-comments">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.author}:</strong> {comment.text}
            </div>
          ))}
          <div className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={handleCommentSubmit}>Submit Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;

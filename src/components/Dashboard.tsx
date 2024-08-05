import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Updated import
import "../styles/styles.css";

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState(""); // Added title state
  const [newPost, setNewPost] = useState("");
  const [mediaType, setMediaType] = useState<
    "text" | "video" | "audio" | "image"
  >("text");
  const [mediaUrl, setMediaUrl] = useState("");
  const navigate = useNavigate(); // Updated to useNavigate

  const handlePostSubmit = async () => {
    if (currentUser && title.trim() && newPost.trim()) {
      // Check for title as well
      try {
        const postsCollection = collection(db, "posts");
        await addDoc(postsCollection, {
          title, // Include title
          content: [
            { type: mediaType, content: mediaUrl },
            { type: "text", content: newPost },
          ],
          author: currentUser.email,
          timestamp: serverTimestamp(),
          likes: 0,
          comments: [],
        });
        setTitle(""); // Clear the title field
        setNewPost(""); // Clear the post content field
        setMediaUrl(""); // Clear the media URL field
        setMediaType("text"); // Reset media type
        navigate("/"); // Redirect to Landing Page
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      <input
        className="dashboard__title-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title" // Added placeholder for title input
      />
      <textarea
        className="dashboard__textarea"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Write your post content here..."
      />
      <select
        className="dashboard__select"
        value={mediaType}
        onChange={(e) =>
          setMediaType(e.target.value as "text" | "video" | "audio" | "image")
        }
      >
        <option value="text">Text</option>
        <option value="video">Video</option>
        <option value="audio">Audio</option>
        <option value="image">Image</option>
      </select>
      <input
        className="dashboard__input"
        type="text"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
        placeholder="Enter media URL"
      />
      <button className="dashboard__submit-button" onClick={handlePostSubmit}>
        Submit Post
      </button>
    </div>
  );
};

export default Dashboard;

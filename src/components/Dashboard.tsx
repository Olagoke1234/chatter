import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
// import { signOut } from "firebase/auth";
import { db } from "../firebaseConfig"; // Correctly import 'db'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../styles/styles.css";

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = async () => {
    if (currentUser && newPost.trim()) {
      try {
        const postsCollection = collection(db, "posts"); // Use 'db' instead of 'firestore'
        await addDoc(postsCollection, {
          content: newPost,
          author: currentUser.email,
          timestamp: serverTimestamp(),
          likes: 0,
          comments: [],
        });
        setNewPost(""); // Clear the input field
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      {/* <button
        className="dashboard__signout-button"
        onClick={() => signOut(auth)}
      >
        Sign Out
      </button> */}
      <textarea
        className="dashboard__textarea"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Write your post here..."
      />
      <button className="dashboard__submit-button" onClick={handlePostSubmit}>
        Submit Post
      </button>
    </div>
  );
};

export default Dashboard;

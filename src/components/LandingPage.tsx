import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../styles/styles.css";

interface PostContent {
  type: "text" | "video" | "audio" | "image";
  content: string;
}

interface Post {
  id: string;
  title: string;
  content: PostContent[];
}

const LandingPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      console.log("Fetched posts:", postsData); // Logging the fetched data
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  const emptyItemsCount = Math.max(0, 5 - posts.length); // Number of empty grid items needed to make 5

  return (
    <main>
      <div className="grid-container">
        {posts.map((post) => (
          <div key={post.id} className="grid-item">
            <h3>{post.title}</h3>
            {Array.isArray(post.content) &&
              post.content.map((c, index) => (
                <div key={index} className="content">
                  {c.type === "text" && <p className="truncate">{c.content}</p>}
                  {c.type === "video" && (
                    <iframe
                      src={`https://www.youtube.com/embed/${c.content}`}
                      title="Video Post"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                  {c.type === "audio" && (
                    <audio controls>
                      <source src={c.content} />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {c.type === "image" && <img src={c.content} alt="Post" />}
                </div>
              ))}
          </div>
        ))}
        {Array.from({ length: emptyItemsCount }).map((_, index) => (
          <div key={`empty-${index}`} className="grid-item empty">
            No posts available
          </div>
        ))}
      </div>
    </main>
  );
};

export default LandingPage;

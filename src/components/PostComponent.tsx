import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface PostContent {
  type: "text" | "video" | "audio" | "image";
  content: string;
}

interface PostComponentProps {
  title?: string;
  content?: PostContent[];
}

const convertToEmbedUrl = (url: string): string => {
  try {
    const videoId = new URL(url).searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (e) {
    // Handle error if URL is invalid or cannot be parsed
  }
  return url; // Return original URL if it's not a YouTube URL
};

const PostComponent: React.FC<PostComponentProps> = ({
  title = "",
  content = [],
}) => {
  const [postTitle, setPostTitle] = useState(title);
  const [postContent, setPostContent] = useState<PostContent[]>(content);
  const navigate = useNavigate();

  useEffect(() => {
    if (title) setPostTitle(title);
    if (content) setPostContent(content);
  }, [title, content]);

  const handleAddContent = (type: PostContent["type"]) => {
    const newContent: PostContent = { type, content: "" };
    setPostContent([...postContent, newContent]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title: postTitle,
        content: postContent.map((c) => ({
          ...c,
          content:
            c.type === "video" ? convertToEmbedUrl(c.content) : c.content,
        })),
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        placeholder="Title"
        required
      />
      {postContent.map((c, index) => (
        <div key={index}>
          <input
            type="text"
            value={c.content}
            onChange={(e) =>
              setPostContent(
                postContent.map((item, i) =>
                  i === index ? { ...item, content: e.target.value } : item
                )
              )
            }
            placeholder={`Content ${index + 1}`}
            required
          />
        </div>
      ))}
      <button type="button" onClick={() => handleAddContent("text")}>
        Add Text
      </button>
      <button type="button" onClick={() => handleAddContent("video")}>
        Add Video
      </button>
      <button type="button" onClick={() => handleAddContent("audio")}>
        Add Audio
      </button>
      <button type="button" onClick={() => handleAddContent("image")}>
        Add Image
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostComponent;

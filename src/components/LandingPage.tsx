import React, { useState, useEffect } from "react";
import { PostType } from "../types/PostType";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import PostComponent from "../components/PostComponent";
import "../styles/styles.css";

const PAGE_SIZE = 2;

const LandingPage: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null); // Keep track of the last visible document
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    try {
      let postQuery = query(
        collection(db, "posts"),
        orderBy("timestamp", "desc"),
        limit(PAGE_SIZE)
      );

      if (lastVisible) {
        postQuery = query(postQuery, startAfter(lastVisible));
      }

      const postSnapshot = await getDocs(postQuery);
      const postList: PostType[] = postSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as PostType)
      );

      // Ensure that we don't add duplicate posts
      setPosts((prevPosts) => {
        const existingPostIds = new Set(prevPosts.map((post) => post.id));
        const newPosts = postList.filter(
          (post) => !existingPostIds.has(post.id)
        );
        return [...prevPosts, ...newPosts];
      });

      // Update lastVisible and hasMore based on whether there are more documents
      setLastVisible(postSnapshot.docs[postSnapshot.docs.length - 1]);
      setHasMore(postSnapshot.docs.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const loadMorePosts = () => {
    if (hasMore) {
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div className="posts-grid">
        {posts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>
      {hasMore && (
        <div className="pagination">
          <button className="page-button" onClick={loadMorePosts}>
            Load More
          </button>
        </div>
      )}
    </main>
  );
};

export default LandingPage;

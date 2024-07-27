import React from "react";
import "../styles/styles.css";

interface HomeProps {
  refreshPosts?: boolean; // Make it optional if not always provided
}

const Home: React.FC<HomeProps> = ({ refreshPosts = false }) => {
  return (
    <div className="home">
      <h1 className="home__title">Home</h1>
      {refreshPosts ? (
        <p className="home__refresh-message">Refreshing posts...</p>
      ) : (
        <p className="home__welcome-message">Welcome to Chatter!</p>
      )}
    </div>
  );
};

export default Home;

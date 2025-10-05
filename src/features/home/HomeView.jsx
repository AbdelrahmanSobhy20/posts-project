import React, { useEffect, useState } from "react";
import AddButton from "../../components/addbuttom";
import { db } from "../../../firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import PostCard from "../../features/home/PostCard"; // استدعاء الكارد
import NoPosts from "./NoPosts";
import AddPostButton from "../../components/AddPostButton";
import Loader from "./Loader";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "sobhyPosts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
    } catch (err) {
      console.error("Error fetching posts: ", err);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      
      {loading ? (
        <Loader message="Loading posts..." />
      ) : posts.length === 0 ? (
        <NoPosts />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <AddPostButton onClick={() => (window.location.href = "/add")} />

    </div>
  );
}

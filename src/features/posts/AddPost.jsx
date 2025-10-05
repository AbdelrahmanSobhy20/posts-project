import { useState } from "react";
import { db, storage, auth } from "../../../firebase/config";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

import "./AddPost.css";

function AddPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (image) {
        const storageRef = ref(storage, `posts/${Date.now()}-${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      const user = auth.currentUser;
      if (!user) {
        toast.error("⚠️ Please login first!");
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, "sobhyUsers", user.uid);
      const userDoc = await getDoc(userDocRef);

      let profileData = {};
      if (userDoc.exists()) {
        profileData = userDoc.data();
      }

      await addDoc(collection(db, "sobhyPosts"), {
        title,
        desc,
        image: imageUrl,
        createdAt: serverTimestamp(),
        author: profileData.name || user.displayName || "Unknown User",
        authorId: user.uid,
        authorEmail: user.email,
        authorAvatar:
          profileData.photoURL || user.photoURL || "/default-avatar.png",
      });

      toast.success(" Post added successfully!");
      setTitle("");
      setDesc("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      toast.error("Post not added try again ");

      console.error("❌ Error adding post: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addpost-container">
      <form onSubmit={handleSubmit} className="addpost-form">
        <h2 className="addpost-title">➕ Add New Post</h2>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="addpost-input"
          required
        />

        <textarea
          placeholder="Write something..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="addpost-textarea"
          required
        />

        {/* Upload Box */}
        <label className="upload-box">
          <span>Click to Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />
        </label>

        {preview && (
          <div className="addpost-preview">
            <p>Preview</p>
            <img src={preview} alt="preview" />
          </div>
        )}

        <button type="submit" className="addpost-button" disabled={loading}>
          {loading ? "Uploading..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}

export default AddPost;

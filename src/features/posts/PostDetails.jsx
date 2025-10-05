import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth, storage } from "../../../firebase/config";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./PostDetails.css";
import Loader from "../home/Loader";
import ConfirmModal from "../../components/ConfirmModal";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", desc: "" });
  const [newImage, setNewImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Load post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const snap = await getDoc(doc(db, "sobhyPosts", id));
        if (snap.exists()) {
          const data = { id: snap.id, ...snap.data() };
          setPost(data);
          setForm({ title: data.title || "", desc: data.desc || "" });
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Error loading post data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const isAuthor =
    auth.currentUser && post && auth.currentUser.uid === post.authorId;

  const handleSave = async () => {
    if (!post) return;
    setSaving(true);
    setError(null);
    try {
      let imageUrl = post.image || "";
      if (newImage) {
        const storageRef = ref(storage, `posts/${Date.now()}-${newImage.name}`);
        await uploadBytes(storageRef, newImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      const updatedData = {
        title: form.title,
        desc: form.desc,
        image: imageUrl,
      };

      await updateDoc(doc(db, "sobhyPosts", post.id), updatedData);

      setPost((prev) => ({
        ...prev,
        ...updatedData,
      }));
      setEditing(false);
      setNewImage(null);
    } catch (err) {
      console.error("Error saving post:", err);
      setError("Failed to save post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (!post) return;
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!post) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "sobhyPosts", post.id));
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete post.");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  if (loading) return <Loader message="Loading post..." />;
  if (!post || error)
    return <div className="error-page">⚠️ {error || "Post not found"}</div>;

  const currentImage = newImage ? URL.createObjectURL(newImage) : post.image;

  return (
    <div className="post-details-container">
      {error && <div className="general-error-message">{error}</div>}

      <div className="post-details-card">
        {editing ? (
          <div className="edit-view">
            <div
              className={`post-image-preview ${currentImage ? "" : "no-image"}`}
            >
              <img
                src={currentImage || "/default-placeholder.svg"}
                alt="Preview"
              />
            </div>

            <div className="edit-form">
              <input
                className="input-title"
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                className="textarea-desc"
                placeholder="Description"
                rows={8}
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
              <label className="image-upload-label">
                <span className="label-text">Change Image (optional):</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                />
                {newImage && <span className="file-name">{newImage.name}</span>}
              </label>
              <div className="form-actions">
                <button
                  className="btn btn-save"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "💾 Saving..." : "💾 Save Changes"}
                </button>
                <button
                  className="btn btn-cancel"
                  onClick={() => setEditing(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="read-view">
            {post.image && (
              <div className="post-image">
                <img src={post.image} alt={post.title} />
              </div>
            )}

            <div className="post-content">
              <h1 className="post-title">{post.title}</h1>
              <p className="post-description">{post.desc}</p>
            </div>
          </div>
        )}

        <div className="author-info">
          <img
            src={post.authorAvatar || "/default-avatar.png"}
            alt="Author Avatar"
            className="author-avatar"
          />
          <span className="author-name">{post.author || "Anonymous"}</span>
        </div>

        {isAuthor && !editing && (
          <div className="actions">
            <button className="btn btn-edit" onClick={() => setEditing(true)}>
              Edit Post
            </button>
            <button className="btn btn-delete" onClick={handleDelete}>
              Delete Post
            </button>
          </div>
        )}
        <ConfirmModal
          open={showConfirm}
          title="Delete Post"
          message="Are you sure you want to delete this post? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      </div>
    </div>
  );
}

const handleDelete = () => setShowConfirm(true);
const confirmDelete = async () => {
  if (!post) return;
  setDeleting(true);
  setError(null);
  try {
    await deleteDoc(doc(db, "sobhyPosts", post.id));
    navigate("/");
  } catch (err) {
    console.error("Error deleting post:", err);
    setError("Failed to delete post.");
  } finally {
    setDeleting(false);
    setShowConfirm(false);
  }
};

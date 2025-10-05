
import React from "react";
import "./Post.css"; // لو هتحط CSS في ملف منفصل
export default function Post({postTitle , postDescription , postImage , postAuthor, postedAt, authorAvatar}) {
  return (
    <article className="post-card">
      <div className="post-image-wrap">
        <img
          className="post-image"
          src={postImage}
          alt="Post"
        />
      </div>

      <div className="post-content">
        <h3 className="post-title"> {postTitle}</h3>
        <p className="post-desc">
          {postDescription}
        </p>

        <div className="post-meta">
          <div className="author">
            <img
              className="author-avatar"
              src={authorAvatar}
              alt="Author"
            />
            <div className="author-info">
              <span className="author-name">{postAuthor}</span>
              <span className="post-date"> {postedAt}</span>
            </div>
          </div>

          <div className="post-actions">
            <button className="btn btn-edit">Edit</button>
            <button className="btn btn-delete">Remove</button>
          </div>
        </div>
      </div>
    </article>
  );
}
// 
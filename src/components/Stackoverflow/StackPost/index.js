// Import
import React from 'react';

// Local import
import './style.css';

function StackPost(props) {
  // Получаем всю информацию одного поста
  const {postData} = props
  return (
    <div className="post-container">
      <a href={postData.link}>
        <div className="post">
          {
            postData.owner.profile_image
            ?
              <div className="post-picture"><img src={postData.owner.profile_image} alt={postData.owner.display_name} /></div>
            :
              <div className="post-picture"></div>
          }
          <div className="post-title">{postData.title}</div>
        </div>
      </a>
    </div>
  );
}

export default StackPost;

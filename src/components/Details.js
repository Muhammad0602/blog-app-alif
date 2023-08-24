import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';
import {FaCircleUser} from 'react-icons/fa6'
import { getComments } from '../redux/comments/commentsSlice';

function Details() {
  const { id } = useParams();
  const postId = parseInt(id, 10);
  const { posts } = useSelector((store) => store.posts);
  const { comments } = useSelector((store) => store.comments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === postId) || null;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  return (
    <div className="details-container">
      <button onClick={() => navigate('/')} type="button" className="back-button">
        <BiArrowBack aria-hidden="true" />
        <span className="visually-hidden">Go back to the home page</span>
      </button>
      {post ? (
        <div className="details">
          <h1 className="post-title">{post.title}</h1>
          <p className="post-body">{post.body}</p>
          <div className="comments-container">
            <h2 className="comments-title"> Recent Comments:</h2>
            {comments?.map((comment) => (
              <div key={comment.id} className="comment">
                <div className='user'>
                   <FaCircleUser className='user-photo'/>
                <h3 className="comment-name">
                  {comment.name.slice(0, 12)}
                </h3>
                </div>
               
                <p className="comment-body">
                  " {comment.body} "
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="error-message">Post not found</p>
      )}
    </div>
  );
}

export default Details;

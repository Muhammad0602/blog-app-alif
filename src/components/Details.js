import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(typeof id)
  const postId = parseInt(id, 10);
  console.log(typeof postId)
  const { posts } = useSelector((store) => store.posts);
  const post = posts.length > 1 ? posts[postId - 1] : posts;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="details">
      <button onClick={() => navigate('/')} type="button">
        <BiArrowBack aria-hidden="true" />
        <span className="visually-hidden">Go back to the home page</span>
      </button>
     <h1>{post.title}</h1>
     <p>{post.body}</p>
    </div>
  );
}

export default Details;
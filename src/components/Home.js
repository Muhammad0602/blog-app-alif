import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../redux/posts/postsSlice';

function Home() {
  const { posts, isLoading, error } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oopps somethings went wrong.PLease try again!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="posts-container">
                    {/* {posts.map(post => {
                    return <div>
                            <h1>{post.title}</h1>
                            <p>{post.body}</p>
                        </div>
                    })} */}
      {posts.length > 1 ? posts.map((post) => (
        <Link
          to={`/Details/${post.id}`}
          key={post.id}
          className="post-container"
        >
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </Link>
      ))
        : (
          <Link
            to={`/Details/${posts.id}`}
            key={posts.id}
            className="post-container"
          >
            <h2>{posts.title}</h2>
            <p>{posts.body}</p>
          </Link>
        )}
    </div>
  );
}

export default Home;
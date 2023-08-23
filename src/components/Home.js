import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../redux/posts/postsSlice';
import { setCurrentPage, setItemsPerPage, setCurrentPosts} from '../redux/posts/postsSlice';

function Home() {
  const { posts, isLoading, error, currentPage, itemsPerPage, currentPosts } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentPosts(posts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)))
  }, [itemsPerPage, currentPage, posts])

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
        <h2>Oopps something went wrong. Please try again!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="posts-container">
        <input 
        type="search" 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder='search post by its title'
        />
      <h1>List of our Posts</h1>
      <div className="items-per-page">
        <label>Items per page:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      {currentPosts.filter(item => {
        return search.toLowerCase() === "" ? item : 
        item.title.toLowerCase().includes(search)
      }).map((post) => (
        <Link
          to={`/Details/${post.id}`}
          key={post.id}
          className="post-container"
        >
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </Link>
      ))}
      <div className="pagination-controls">
        <button
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          disabled={ posts.length <= currentPage*itemsPerPage}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;

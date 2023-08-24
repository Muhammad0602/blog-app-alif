import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getPosts, setCurrentPage, setItemsPerPage, setCurrentPosts,
} from '../redux/posts/postsSlice';

function Home() {
  const {
    posts, isLoading, error, currentPage, itemsPerPage, currentPosts,
  } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const userCategories = [
    { userId: 1, category: 'Technology' },
    { userId: 2, category: 'Travel' },
    { userId: 3, category: 'Food' },
    { userId: 4, category: 'Fashion' },
    { userId: 5, category: 'Health' },
    { userId: 6, category: 'Sports' },
    { userId: 7, category: 'Music' },
    { userId: 8, category: 'Art' },
    { userId: 9, category: 'Science' },
    { userId: 10, category: 'Lifestyle' },
  ];

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const lastIndex = currentPage * itemsPerPage;
    dispatch(setCurrentPosts(posts.slice(startIndex, lastIndex)));
  }, [itemsPerPage, currentPage, posts, dispatch]);

  const handleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((selectedUserId) => selectedUserId !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

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
    <div className="home-container">
      <div className="search-features">
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search post by its title"
          className="search-input"
        />
        <div className="user-category-filters">
          {userCategories.map((category) => (
            <label htmlFor={category.userId} key={category.userId}>
              <input
                type="checkbox"
                id={category.userId}
                checked={selectedUsers.includes(category.userId)}
                onChange={() => handleUserSelection(category.userId)}
              />
              {category.category}
            </label>
          ))}
        </div>
        <div className="items-per-page">
          <p>Items per page:</p>
          <select
            value={itemsPerPage}
            onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="posts-container">
        {currentPosts
          .filter((item) => search.toLowerCase() === '' || item.title.toLowerCase().includes(search))
          .filter((item) => selectedUsers.length === 0 || selectedUsers.includes(item.userId))
          .map((post) => (
            <Link
              to={`/Details/${post.id}`}
              key={post.id}
              className="post-container"
            >
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </Link>
          ))}
      </div>

      <div className="pagination-controls">
        <button
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="pagination-button"
          type="button"
        >
          Previous
        </button>
        <button
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          disabled={posts.length <= currentPage * itemsPerPage}
          className="pagination-button"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import blog1 from '../blog-alif/blog1.jpg';
import blog2 from '../blog-alif/blog2.png';
import blog3 from '../blog-alif/blog3.png';
import blog4 from '../blog-alif/blog4.jpeg';
import blog5 from '../blog-alif/blog5.jpeg';
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

  const blogArray = [blog1, blog2, blog3, blog4, blog5];

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
    let results = [...posts];
    
    if(search) {
        results = results.filter(post => 
            post.title.toLowerCase().includes(search));
    }
    if(selectedUsers.length) {
        results = results.filter(post =>selectedUsers.includes(post.userId))
    }
    dispatch(setCurrentPosts(results.slice(startIndex, lastIndex)));
  }, [itemsPerPage, currentPage, posts, dispatch, search, selectedUsers.length]);

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
        {currentPosts.map((post) => {
            const blogId = Math.floor(Math.random()*5);
            return <Link
              to={`/Details/${post.id}`}
              key={post.id}
              className="post-container"
            >
              <img src={blogArray[blogId]} /> 
              <h3>{post.title}</h3>
            </Link>
})}
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

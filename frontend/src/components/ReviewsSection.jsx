import React, { useEffect, useState } from 'react';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState(() => {
    // Get saved reviews from local storage
    const savedReviews = localStorage.getItem('reviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  const [newReview, setNewReview] = useState({ name: '', rating: '', comment: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  // Function to handle form submission and add a new review
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.rating && newReview.comment) {
      const updatedReviews = [
        ...reviews,
        { id: reviews.length + 1, ...newReview, rating: parseInt(newReview.rating) },
      ];
      setReviews(updatedReviews);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews)); // Save reviews to local storage
      setNewReview({ name: '', rating: '', comment: '' }); // Reset form after submission
    }
  };

  // Function to handle deletion of a review
  const handleDeleteReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews)); // Update local storage
  };

  return (
    <div className='mt-20'>
      <h2 className='text-2xl font-semibold mb-4'>Customer Reviews</h2>
      <div className='flex flex-col gap-4 border px-6 py-4 bg-gray-50 rounded-lg'>
        {/* Reviews List */}
        {reviews.map((review) => (
          <div key={review.id} className='border-b py-2 flex justify-between items-start'>
            <div>
              <h3 className='font-semibold'>{review.name}</h3>
              <div className='flex items-center mb-2'>
                {/* Display star rating */}
                {[...Array(review.rating)].map((_, index) => (
                  <img
                    key={index}
                    className='w-4 h-4'
                    src='https://img.icons8.com/material-outlined/24/000000/star--v1.png'
                    alt='Star'
                  />
                ))}
                {[...Array(5 - review.rating)].map((_, index) => (
                  <img
                    key={index}
                    className='w-4 h-4'
                    src='https://img.icons8.com/material-outlined/24/000000/star.png'
                    alt='Star'
                  />
                ))}
              </div>
              <p className='text-gray-500'>{review.comment}</p>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDeleteReview(review.id)}
              className='text-red-600 text-sm hover:underline'
            >
              Delete
            </button>
          </div>
        ))}

        {/* Review Form */}
        <div className='mt-6'>
          <h3 className='text-xl font-semibold mb-3'>Submit Your Review</h3>
          <form className='flex flex-col gap-3' onSubmit={handleFormSubmit}>
            <input
              className='border px-3 py-2 rounded-md'
              type='text'
              name='name'
              placeholder='Your Name'
              value={newReview.name}
              onChange={handleInputChange}
              required
            />
            <input
              className='border px-3 py-2 rounded-md'
              type='number'
              name='rating'
              placeholder='Rating (1-5)'
              value={newReview.rating}
              onChange={handleInputChange}
              min='1'
              max='5'
              required
            />
            <textarea
              className='border px-3 py-2 rounded-md'
              name='comment'
              placeholder='Your Comment'
              value={newReview.comment}
              onChange={handleInputChange}
              required
            />
            <button
              type='submit'
              className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors'
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;

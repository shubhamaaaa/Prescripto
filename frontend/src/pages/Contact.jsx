import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., local storage, alerts, etc.)
    alert('Your message has been sent! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className='bg-white py-10'>
      <div className='max-w-4xl mx-auto px-6'>
        <div className='text-center mb-10'>
        <p className='text-2xl text-gray-400'>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
          <p className='text-gray-400 mt-4'>
            Have questions or need help? Get in touch with us, and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className='bg-white shadow-md rounded-lg p-6'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Name
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-green-500 focus:outline-none'
                placeholder='Your name'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-green-500 focus:outline-none'
                placeholder='Your email'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Message
              </label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleInputChange}
                rows='5'
                className='w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-green-500 focus:outline-none'
                placeholder='Your message'
                required
              />
            </div>
            <div>
              <button
                type='submit'
                className='w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors'
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className='mt-10 text-center'>
          <h2 className='text-2xl font-semibold text-gray-700'>Our Location</h2>
          <p className='text-gray-600'>Vashali sec-5,Ghaziabad City, India</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;


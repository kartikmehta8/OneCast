import React, { useState } from 'react';

const Announcement = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subject:', subject);
    console.log('Body:', body);
  };

  return (
    <div className='flex justify-center items-center pt-20'>
      <form
        className='p-6 bg-white border rounded-md'
        style={{ width: '500px' }}
      >
        <h2 className='text-lg mb-4'>Announcement</h2>
        <div className='mb-4'>
          <label className='block text-gray-600 text-sm font-bold mb-2 signUp-font'>
            Subject
          </label>
          <input
            type='text'
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-600 text-sm font-bold mb-2 signUp-font'>
            Body
          </label>
          <textarea
            className='w-full h-24 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div className='flex justify-between'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline signUp-font'
            // onClick={handleSubmit}
          >
            Continue
          </button>
          <button
            type='submit'
            className='bg-green-500 hover:bg-green-700 text-white font-bold h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline signUp-font'
          >
            &nbsp;GenAI&nbsp;
          </button>
        </div>
      </form>
    </div>
  );
};

export default Announcement;

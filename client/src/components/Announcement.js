import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Announcement = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const [slack, setSlack] = useState(false);
  const [discord, setDiscord] = useState(false);
  const [telegram, setTelegram] = useState(false);

  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (slack === false && discord === false && telegram === false) {
      alert('Please select at least one social media');
      return;
    }

    const response = await axios.post('http://localhost:5000/store/', {
      email: currentUser.email,
      subject,
      body,
      slack,
      discord,
      telegram,
    });

    alert(response.data.success);
    setSubject('');
    setBody('');
    setSlack(false);
    setDiscord(false);
    setTelegram(false);
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
          <div></div>
          <span
            style={{ cursor: 'pointer' }}
            className='bg-green-500 hover:bg-green-700 text-white font-bold h-10 py-2 px-4  rounded focus:outline-none focus:shadow-outline signUp-font'
          >
            &nbsp;GenAI&nbsp;
          </span>
        </div>
        <div>
          {subject && body ? (
            <div>
              <div className='mt-4'>
                <label className='block text-gray-600 text-sm font-bold mb-2 signUp-font'>
                  Social Media
                </label>
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      className='mr-2 leading-tight'
                      checked={slack}
                      onChange={() => setSlack(!slack)}
                    />
                    <span className='text-sm signUp-font'>Slack</span>

                    <input
                      type='checkbox'
                      className='ml-4 mr-2 leading-tight'
                      checked={discord}
                      onChange={() => setDiscord(!discord)}
                    />
                    <span className='text-sm signUp-font'>Discord</span>

                    <input
                      type='checkbox'
                      className='ml-4 mr-2 leading-tight'
                      checked={telegram}
                      onChange={() => setTelegram(!telegram)}
                    />

                    <span className='text-sm signUp-font'>Telegram</span>
                  </div>
                </div>
              </div>
              <div className='mt-12 flex justify-end'>
                <span
                  style={{ cursor: 'pointer' }}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 py-2 px-4  rounded focus:outline-none focus:shadow-outline signUp-font'
                  onClick={handleSubmit}
                >
                  &nbsp;Send&nbsp;
                </span>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Announcement;

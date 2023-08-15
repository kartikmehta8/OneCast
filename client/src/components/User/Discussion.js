import React, { useState, useEffect } from 'react';
import { BASE_URL, ADMIN_EMAIL } from '../../constants/constants';
import axios from 'axios';

export default function Discussion({ email }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  async function handleSubmit(e, emailStatus) {
    e.preventDefault();

    if (message === '') {
      alert('Please enter a message');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/discussion/`, {
        email: email,
        message: message,
        notify: emailStatus,
      });

      if (response.status === 201) {
        alert('Message sent');
        setMessage('');
      } else {
        alert('Error sending message');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleMessageDelete(id) {
    try {
      const response = await axios.delete(`${BASE_URL}/discussion/${id}`);

      if (response.status === 200) {
        alert('Message deleted');
      } else {
        alert('Error deleting message');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get(`${BASE_URL}/discussion/`);

        if (response.status === 200) {
          setMessages(response.data);
        } else {
          console.log('Error fetching messages');
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchMessages();
  }, []);

  return (
    <div>
      <div className='flex justify-center mt-12 signUp-font'>
        <form className='flex flex-col'>
          <textarea
            rows={3}
            cols={50}
            placeholder='Enter your message'
            className='p-4 border'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className='flex flex-row w-full '>
            <div
              onClick={(e) => handleSubmit(e, false)}
              className='text-white bg-green-500 hover:bg-green-600 text-lg py-1 w-full flex justify-center cursor-pointer'
            >
              Send
            </div>
            <div
              onClick={(e) => handleSubmit(e, true)}
              className='text-white bg-blue-500 hover:bg-blue-600 text-lg py-1 w-full flex justify-center cursor-pointer'
            >
              Send &amp; Email
            </div>
          </div>
        </form>
      </div>
      <div className='flex justify-center mt-12 signUp-font'>
        <div
          className='border-b border-black text-lg'
          style={{ minWidth: '550px' }}
        >
          Discussions
        </div>
      </div>
      <div>
        {messages.length === 0 ? (
          <div className='flex justify-center mt-12'>
            <div>
              <div className='border m-6 p-6 signUp-font'>
                <h1 className='text-xl'>Nothing To Show</h1>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex justify-center mt-4 '>
            <div className='border flex-col flex' style={{ width: '600px' }}>
              {messages.map((message) => (
                <div
                  className={
                    email === message.email
                      ? 'flex justify-end'
                      : 'flex justify-start'
                  }
                >
                  <div
                    className={
                      'border m-6 p-6 signUp-font text-white rounded-xl' +
                      (email === message.email
                        ? ' bg-blue-500'
                        : ' bg-green-500')
                    }
                    style={{ width: '400px' }}
                  >
                    <div className='text-sm mb-2 flex justify-between'>
                      <span className='border font-bold border-white rounded-full px-2'>
                        {message.email}
                      </span>
                      {(email === message.email || email === ADMIN_EMAIL) && (
                        <span
                          className='px-2 bg-red-500 hover:bg-red-600 rounded-full cursor-pointer'
                          style={{ fontSize: '10px' }}
                          onClick={() => handleMessageDelete(message._id)}
                        >
                          X
                        </span>
                      )}
                    </div>
                    <h1 className='text-xl'>{message.message}</h1>

                    <h1
                      className='mt-8 flex justify-end'
                      style={{ fontSize: '12px' }}
                    >
                      <span className='px-2 py-1'>&nbsp;{message.time}</span>
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../contexts/AuthContext';

import { Draft } from '../index';
import { checkIfImage } from '../../utils';
import { BASE_URL } from '../../constants/constants';

const Announcement = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [imgURL, setImgURL] = useState('');

  const [slack, setSlack] = useState(false);
  const [discord, setDiscord] = useState(false);
  const [telegram, setTelegram] = useState(false);

  const [user, setUser] = useState();
  const [showDraft, setShowDraft] = useState(false);

  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (slack === false && discord === false && telegram === false) {
      alert('Please select at least one social media');
      return;
    }

    if (imgURL !== '') {
      const isValidImage = await checkIfImage(imgURL);
      if (!isValidImage) {
        alert('Please enter a valid image URL');
        return;
      }
    }

    const response = await axios.post(`${BASE_URL}/store/`, {
      email: currentUser.email,
      subject,
      body,
      slack,
      discord,
      telegram,
      imgURL: imgURL === '' ? null : imgURL,
    });

    if (response.data.success === true) {
      if (slack) {
        const res = await axios.post(`${BASE_URL}/slack/`, {
          body,
          imgURL,
        });
        if (res.data.success) {
          console.log('Slack Success');
        } else {
          console.log('Slack Failed');
        }
      }
      if (telegram) {
        const res = await axios.post(`${BASE_URL}/telegram/`, {
          body,
          imgURL,
        });
        if (res.data.success) {
          console.log('Telegram Success');
        } else {
          console.log('Telegram Failed');
        }
      }
      if (discord) {
        const res = await axios.post(`${BASE_URL}/discord/`, {
          body,
          imgURL,
        });
        if (res.data.success) {
          console.log('Discord Success');
        } else {
          console.log('Discord Failed');
        }
      }
      
      alert('Announcement sent successfully');
      setSubject('');
      setBody('');
      setSlack(false);
      setDiscord(false);
      setTelegram(false);
      setImgURL('');
    } else {
      alert('Announcement failed to send');
    }
  };

  const handleSubmitDraft = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${BASE_URL}/draft/`, {
      email: currentUser.email,
      subject,
      body,
    });

    alert(response.data.success);
    setSubject('');
    setBody('');
    setSlack(false);
    setDiscord(false);
    setTelegram(false);
    setImgURL('');
  };

  const generateText = async () => {
    if (subject === '') {
      alert('Please enter a subject');
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/text/`, {
        body: subject,
      });
      if (response.data.success) {
        setBody(response.data.data.output);
      } else {
        alert('Text generation failed');
      }
    } catch (error) {
      console.log(error);
      alert('Text generation failed');
    }
  };

  useEffect(() => {
    async function userAccess(email) {
      try {
        const response = await axios.get(`${BASE_URL}/user/${email}`);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    userAccess(currentUser.email);
  }, [currentUser.email]);

  return (
    <div>
      <div className='flex justify-center items-center pt-20'>
        <form
          className='p-6 bg-white border rounded-md'
          style={{ width: '500px' }}
        >
          <h2 className='text-lg mb-4'>Announcement</h2>
          <div className='mb-4'>
            <label className='block text-gray-600 text-sm font-bold mb-2 signUp-font'>
              Subject *
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
              Image URL
            </label>
            <input
              type='url'
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              value={imgURL}
              onChange={(e) => setImgURL(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-600 text-sm font-bold mb-2 signUp-font'>
              Body *
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
              onClick={generateText}
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
                      {user.slack ? (
                        <div>
                          <input
                            type='checkbox'
                            className='mr-2 leading-tight'
                            checked={slack}
                            onChange={() => setSlack(!slack)}
                          />
                          <span className='text-sm signUp-font'>Slack</span>
                        </div>
                      ) : (
                        <></>
                      )}

                      {user.discord ? (
                        <div>
                          <input
                            type='checkbox'
                            className='ml-4 mr-2 leading-tight'
                            checked={discord}
                            onChange={() => setDiscord(!discord)}
                          />
                          <span className='text-sm signUp-font'>Discord</span>
                        </div>
                      ) : (
                        <></>
                      )}

                      {user.telegram ? (
                        <div>
                          <input
                            type='checkbox'
                            className='ml-4 mr-2 leading-tight'
                            checked={telegram}
                            onChange={() => setTelegram(!telegram)}
                          />
                          <span className='text-sm signUp-font'>Telegram</span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className='mt-12 flex justify-end'>
                  <span
                    style={{ cursor: 'pointer' }}
                    className='mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 py-2 px-4  rounded focus:outline-none focus:shadow-outline signUp-font'
                    onClick={handleSubmitDraft}
                  >
                    Save to Drafts
                  </span>
                  <span
                    style={{ cursor: 'pointer' }}
                    className='bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 py-2 px-4  rounded focus:outline-none focus:shadow-outline signUp-font'
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
      <div className='flex mt-12 justify-center'>
        <span
          onClick={() => setShowDraft(!showDraft)}
          style={{ cursor: 'pointer' }}
          className={
            'signUp-font text-md rounded-lg py-2 px-4 font-bold text-white ' +
            (showDraft ? 'bg-red-500' : 'bg-blue-500')
          }
        >
          {showDraft ? 'Close Drafts' : 'Show Drafts'}
        </span>
      </div>
      <div className='flex justify-center mt-8'>
        {showDraft ? (
          <Draft
            email={currentUser.email}
            setSubject={setSubject}
            setBody={setBody}
            setShowDraft={setShowDraft}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Announcement;

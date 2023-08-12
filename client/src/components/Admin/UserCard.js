import React, { useState } from 'react';
import axios from 'axios';

export default function UserCard({ user, index }) {
  const [edit, setEdit] = useState(false);

  const [slack, setSlack] = useState(user.slack);
  const [discord, setDiscord] = useState(user.discord);
  const [telegram, setTelegram] = useState(user.telegram);
  const time = user.time;

  function genFlex(index) {
    if (index % 3 === 0) {
      return 'justify-end';
    }
    if (index % 3 === 1) {
      return 'justify-center';
    }
    if (index % 3 === 2) {
      return 'justify-start';
    }
  }

  async function handleDelete(email) {
    try {
      const response = await axios.delete(
        'http://localhost:5000/user/' + email
      );
      alert(response.data.status);
    } catch (error) {
      alert('Failed to delete user.');
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (slack === false && discord === false && telegram === false) {
      alert('Please select at least one social media');
      return;
    }

    try {
      const response = await axios.patch(
        'http://localhost:5000/user/' + user.email,
        {
          slack,
          discord,
          telegram,
          time,
        }
      );
      alert(response.data.status);
      setEdit(false);
    } catch (error) {
      alert('Failed to update user.');
    }
  }

  return (
    <div className={'flex mt-12 signUp-font ' + genFlex(index)}>
      <div className='p-8 border' style={{ width: '400px' }}>
        <div className='text-2xl font-bold'>{user.email}</div>
        <div className='mt-4'>
          <span className='text-gray-800'>Access:&nbsp;</span>
          {user.slack && (
            <span className='text-sm py-1 px-2 bg-blue-500 text-white rounded-lg mx-2'>
              Slack
            </span>
          )}
          {user.discord && (
            <span className='text-sm py-1 px-2 bg-blue-500 text-white rounded-lg mx-2'>
              Discord
            </span>
          )}
          {user.telegram && (
            <span className='text-sm py-1 px-2 bg-blue-500 text-white rounded-lg mx-2'>
              Telegram
            </span>
          )}
        </div>
        <div className='flex justify-between mt-4'>
          <div>
            {time && (
              <>
                <span className='text-gray-800 text:sm'>Created: </span>
                <span className='text-sm signUp-font font-bold'>{time}</span>
              </>
            )}
          </div>
          <div>
            <button
              className={
                'text-white py-1 px-2 rounded-l-md' +
                (edit
                  ? ' bg-yellow-500 hover:bg-yellow-600'
                  : ' bg-green-500 hover:bg-green-600')
              }
              onClick={() => setEdit(!edit)}
            >
              {!edit ? 'Edit' : 'Cancel'}
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 text-white py-1 px-2 ml-1 rounded-r-md'
              onClick={() => handleDelete(user.email)}
            >
              Delete
            </button>
          </div>
        </div>
        {edit && (
          <div className='signUp-font mt-4'>
            <form>
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
              <div>
                <button
                  type='submit'
                  className='bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md mt-4'
                  onClick={(e) => handleUpdate(e)}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

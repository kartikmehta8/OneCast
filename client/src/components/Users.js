import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [slack, setSlack] = useState(false);
  const [discord, setDiscord] = useState(false);
  const [telegram, setTelegram] = useState(false);
  const [email, setEmail] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (slack === false && discord === false && telegram === false) {
      alert('Please select at least one social media');
      return;
    }

    const response = await axios.post('http://localhost:5000/user/', {
      email,
      slack,
      discord,
      telegram,
    });

    alert(response.data.success);
    setSlack(false);
    setDiscord(false);
    setTelegram(false);
    setEmail('');
  };

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get('http://localhost:5000/user/');
      setUsers(response.data.users);
    }
    getUsers();
  }, [telegram, discord, slack]);

  return (
    <div>
      <div className='flex m-12 justify-center'>
        <form className='flex text-xl'>
          <div className='mr-8'>
            <label>Email</label>
            <input
              value={email}
              className='mx-2 border border-black p-1 border-r-0 border-l-0 border-t-0'
              type='text'
              name='email'
              placeholder='Enter'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
          <button
            className='bg-green-500 text-white hover:bg-green-600 py-1 px-2 mx-4 rounded-lg'
            onClick={handleCreate}
          >
            Create
          </button>
        </form>
      </div>
      <div className='grid grid-cols-3'>
        {users.map((user, index) => (
          <UserCard key={index} user={user} index={index} />
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function History() {
  const [data, setData] = useState([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:5000/store/${currentUser.email}`
      );
      setData(response.data.data);
    }
    fetchData();
  }, [currentUser.email]);

  if (data.length === 0) {
    return (
      <div className='flex justify-center mt-12'>
        <div>
          <div className='border m-6 p-6 signUp-font'>
            <h1 className='text-xl'>Nothing To Show</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center mt-12'>
      <div>
        {data.map((item) => (
          <div className='border m-6 p-6 signUp-font'>
            <div>
              <span className='text-sm tet-gray-800'>Created: </span>
              <span className='text-sm font-semibold'>{item.time}</span>
            </div>
            <h1 className='text-2xl'>{item.subject}</h1>
            <div className='my-2'>{item.body}</div>
            <div className='flex mt-2'>
              {item.slack && (
                <span className='text-white bg-blue-500 mx-2 py-1 px-2 text-sm rounded-lg'>
                  Slack
                </span>
              )}
              {item.discord && (
                <span className='text-white bg-blue-500 mx-2 py-1 px-2 text-sm rounded-lg'>
                  Discord
                </span>
              )}
              {item.telegram && (
                <span className='text-white bg-blue-500 mx-2 py-1 px-2 text-sm rounded-lg'>
                  Telegram
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

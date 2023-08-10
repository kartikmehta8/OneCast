import React from 'react';

export default function UserCard({ user, index }) {
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
        <div className='flex justify-end mt-4'>
          <button className='bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-l-md'>
            Edit
          </button>
          <button className='bg-red-500 hover:bg-red-600 text-white py-1 px-2 ml-1 rounded-r-md'>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

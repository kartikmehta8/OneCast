import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';

export default function Draft({ email, setSubject, setBody, setShowDraft }) {
  const [drafts, setDrafts] = useState([]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/draft/${id}`);
      alert(response.data.success);
      setShowDraft(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUseDraft = async (draft) => {
    setSubject(draft.subject);
    setBody(draft.body);

    await handleDelete(draft._id);
  };

  useEffect(() => {
    async function getDrafts() {
      try {
        const response = await axios.get(`${BASE_URL}/draft/${email}`);
        setDrafts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDrafts();
  }, [email]);

  if (drafts.length === 0) {
    return (
      <div className='flex justify-center'>
        <div>
          <div className='border m-6 p-6 signUp-font'>
            <h1 className='text-xl'>Nothing To Show</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {drafts.map((draft) => {
        return (
          <div key={draft._id} className='border m-6 p-6 signUp-font'>
            <div>
              <span className='text-sm tet-gray-800'>Drafted: </span>
              <span className='text-sm font-semibold'>{draft.time}</span>
            </div>
            <h1 className='text-2xl'>{draft.subject}</h1>
            <div className='my-2'>{draft.body}</div>
            <div className='flex justify-end'>
              <span
                className='text-white py-1 px-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg signUp-font font-bold mr-4'
                style={{ cursor: 'pointer' }}
                onClick={() => handleUseDraft(draft)}
              >
                Use Draft
              </span>
              <span
                className='text-white py-1 px-2 bg-red-500 hover:bg-red-600 rounded-lg signUp-font font-bold'
                style={{ cursor: 'pointer' }}
                onClick={() => handleDelete(draft._id)}
              >
                Delete
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

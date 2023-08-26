import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SlackLogo, DiscordLogo, TelegramLogo, ToolTip, Attachment } from '../../assets';
import { BASE_URL } from '../../constants/constants';

export default function AllAnnouncements() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}/store/`);
      setData(response.data.data);
    }
    fetchData();
  }, []);

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

  const alignItem = (item) => {
    if (item.imgURL) return "justify-between"
    else return "justify-end"
  }

  return (
    <div className='flex justify-center mt-12'>
      <div className='lg:w-2/3 w-9/10 sm:w-4/5 flex-col items-center'>
        {data.map((item, index) => (
          <div key={index} className='border-b-4 border-t-2 border-l-2 border-r-4 m-10 p-6 signUp-font transition-transform transform hover:scale-105 rounded-xl border-black rounded-tl-none hover:shadow-xl bg-gradient-to-br from-gray-100 to-gray-200 max-w-full'>
            <div className='flex justify-between'>
              <span>
                <span className='text-sm tet-gray-800'>Announced: </span>
                <span className='text-sm font-semibold'>{item.time}</span>
              </span>
              <span
                className='py-1 px-2 rounded-xl max-w-full border-2 border-gray-400 items-center flex'
                style={{ fontSize: '12px' }}
              >
                {item.email}
              </span>
            </div>
            <h1 className='text-2xl mt-2 max-w-full text-justify'>{item.subject}</h1>
            <div className='my-2 max-w-full hyphens-auto text-justify'>{item.body}</div>
            <div className={'flex max-w-full ' + alignItem(item)}>
              {item.imgURL && (
                <div className='hover:underline text-blue-800 flex border py-1 px-3 rounded-full items-center border-gray-400'>
                  <img src={Attachment} alt="Attachment" className='h-5 w-5 mr-2' />
                  <a href={item.imgURL} rel='noreferrer' target='_blank'>
                    Attachment
                  </a>
                </div>
              )}
              <div className='flex items-center justify-between'>
                {item.slack && (
                  // <span className='text-white bg-blue-500 mx-2 py-1 px-2 text-sm rounded-lg'>
                  //   Slack
                  // </span>
                  <ToolTip text="Slack">
                    <img
                      src={SlackLogo}
                      alt='slack'
                      className='h-6 w-6 mr-4'
                    />
                  </ToolTip>
                )}
                {item.discord && (
                  // <span className='text-white bg-blue-500 mx-2 py-1 px-2 text-sm rounded-lg'>
                  //   Discord
                  // </span>
                  <ToolTip text="Discord" >
                    <img
                      src={DiscordLogo}
                      alt='discord'
                      className='h-6 w-6 mr-4'
                    />
                  </ToolTip>
                )}
                {item.telegram && (
                  // <span className='text-white bg-blue-500 mx-2 py-1 px-2 text-sm rounded-lg'>
                  //   Telegram
                  // </span>  
                  <ToolTip text='Telegram'>
                    <img
                      src={TelegramLogo}
                      alt='telegram'
                      className='h-6 w-6 mr-4'
                    />
                  </ToolTip>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

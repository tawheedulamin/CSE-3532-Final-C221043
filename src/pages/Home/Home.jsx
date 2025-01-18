import React, { useState, useEffect } from 'react';

const Home = () => {
  // Tab names array
  const tabNames = ['All', 'Music', 'Comedy', 'Drawing'];

  // State to track the active tab
  const [activeTab, setActiveTab] = useState('All');

  // State for the fetched data
  const [videos, setVideos] = useState([]);

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
        const data = await response.json();
        if (data.status) {
          setVideos(data.data); // Set the fetched data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter the videos based on the active tab
  const filteredVideos = activeTab === 'All'
    ? videos
    : videos.filter((video) => {
      // Match based on category_id
      if (activeTab === 'Music') {
        return video.category_id === '1001';
      } else if (activeTab === 'Comedy') {
        return video.category_id === '1003';
      } else if (activeTab === 'Drawing') {
        return video.category_id === '1002';
      }
      return false;
    });

  return (
    <div className="">
      <div className="container mx-auto px-16 mt-16">
        <div role="tablist" className="tabs tabs-boxed gap-4 mx-52">
          {tabNames.map((tabName, index) => (
            <a
              key={index}
              role="tab"
              className={`tab ${activeTab === tabName ? 'bg-red-600 text-white' : 'bg-gray-300 text-black'}`}
              onClick={() => setActiveTab(tabName)}
            >
              {tabName}
            </a>
          ))}
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-4 gap-5">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => (
                <div key={index} className="card card-compact bg-base-100 w-auto shadow-xl">
                  <figure>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className='object-cover h-36'
                    />
                  </figure>
                  <div className="card-body">
                    {/* Avatar and Title */}
                    <div className="flex items-center space-x-4">
                      <img
                        className="w-12 h-12 rounded-full"
                        src={video.authors[0]?.profile_picture || "https://i.pravatar.cc/150?img=3"}
                        alt="Avatar"
                      />
                      <div>
                        <h3 className="font-semibold">{video.title || 'Unknown Author'}</h3>
                      </div>
                    </div>

                    <div className="mt-2 text-sm text-gray-500 flex items-center gap-3">
                      <span>{video.authors[0]?.profile_name}</span>

                      {video.authors[0]?.verified && (
                        <img src='/correct.png' className='h-[15px]' />
                      )}
                    </div>
                    <div className="mt-1 text-xs text-gray-400 ">
                      <span>{video.others.views}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center col-span-4">
                <div className="flex flex-col items-center gap-4">
                  <img src='/Icon.png' className='w-1/2' alt="No content" />
                  <h1 className='text-2xl font-bold'>Oops!! Sorry, There is no content here</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

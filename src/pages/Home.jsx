import React, { useState, useEffect } from 'react';
import Card from '../lib/components/card';
import LineChart from '../lib/components/LineChart';
import DonutChart from '../lib/components/DonutChart';
import { getAnalytics } from '../lib/api/homeApi';

const Home = () => {
  const [userCount, setUserCount] = useState(0);
  const [costumeCount, setCostumeCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAnalytics();
        setUserCount(response.user_count);
        setCostumeCount(response.costume_count);
        setJournalCount(response.journal_created_count);
    } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <div className='mt-10 flex flex-wrap'>
        <div className='mr-2'>
          <Card 
            value={loading ? 'Loading...' : userCount} 
            text='User Count' 
          />
        </div>
        <div className='mr-2'>
          <Card 
            value={loading ? 'Loading...' : costumeCount} 
            text='Costume Count' 
          />
        </div>
        <div className='mr-2'>
          <Card 
            value={loading ? 'Loading...' : journalCount} 
            text='Journal Count' 
          />
        </div>
      </div>

      {error && <div className='text-red-500 mt-4'>{error}</div>}

      <div className='container flex mt-10'>
        {/* <LineChart /> */}
        <span className='mx-4'></span>
        {/* <DonutChart /> */}
      </div>
    </div>
  );
};

export default Home;

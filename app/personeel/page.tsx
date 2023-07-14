"use client";

import Box from '@/components/Box';
import Person from '@/components/Person';
import SearchBar from '@/components/SearchBar';
import { useState, useEffect } from 'react';

const Personeel = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Perform any other necessary actions based on the search value
  };

  return (
    <div className="text-white h-full mx-2">
      <Box className=''>
        <SearchBar onSearch={handleSearch} />
        <Person searchValue={searchValue} />
      </Box>
    </div>
  );
};

export default Personeel;



import React, { useState } from 'react';

type SearchBarProps = {
  onSearch: (searchValue: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center m-10 gap-2'>
      <input
        className='mt-4 rounded-md h-10 p-2 text-black'
        placeholder='Search Habbo'
        value={searchValue}
        onChange={handleInputChange}
      />
      <button className='bg-neutral-800 px-5 rounded-md h-fit w-fit' type="submit">Submit</button>
    </form>
  );
};

export default SearchBar;
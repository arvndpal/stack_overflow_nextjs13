'use client';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import React, { useState } from 'react';

const HomeFilters = () => {
  const [active, setActive] = useState('');
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => setActive(item.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? 'bg-primary-100 text-primary-500'
              : 'bg-light-800'
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;

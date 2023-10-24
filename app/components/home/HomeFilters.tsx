'use client';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import { formUrlQuery } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const HomeFilters = () => {
  const searchParams = useParams();
  const router = useRouter();
  const [active, setActive] = useState('');
  const handleClick = (item: any) => {
    if (active === item) {
      setActive('');
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null,
      });
      router.push(newUrl);
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item,
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => handleClick(item.value)}
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

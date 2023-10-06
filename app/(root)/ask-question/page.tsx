import Question from '@/app/components/forms/Question';
import React from 'react';

const Page = () => {
  return (
    <div>
      <h1 h1-bold text-dark100_light900>
        Ask A Question
      </h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
};

export default Page;

import React, { Suspense } from 'react';
const ReviewDetail = React.lazy(() => import('../components/ReviewDetail'));

export const Review = () => {
  return (
    <>
      <Suspense fallback={<p>loading...</p>}>
        <ReviewDetail />
      </Suspense>
    </>
  );
};

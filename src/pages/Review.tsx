import React, { Suspense } from 'react';
import { Header } from '../components/Header';
const ReviewDetail = React.lazy(() => import('../components/ReviewDetail'));

export const Review = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>loading...</p>}>
        <ReviewDetail />
      </Suspense>
    </>
  );
};

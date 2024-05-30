import Navigation from '../Navigation/Navigation';
import css from './Layout.module.css';
import { Suspense } from 'react';
import Loader from '../Loader/Loader';

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
}

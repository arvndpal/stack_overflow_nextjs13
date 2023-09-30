import React from 'react';
import Navbar from '../components/shared/navbar/Navbar';
import { ThemeProvider } from '@/context/ThemeProvider';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <main className="background-light850_dark100 relative">
        <Navbar />
        <div className="flex">
          leftsidebar
          <section className="flex min-h-screen flex-1 flex-col px-6 pb-14 pt-36 max-md:pb-14 sm:px-14">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </section>
          leftsidebar
        </div>
        Toaster
      </main>
    </ThemeProvider>
  );
};

export default Layout;

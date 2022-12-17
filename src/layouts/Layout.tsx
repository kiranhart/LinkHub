import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <div className="container mx-auto w-full px-8 md:px-9 lg:px-16">{children}</div>
            <Footer />
        </>
    );
};

export default Layout;

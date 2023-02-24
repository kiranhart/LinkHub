import React from 'react';

interface Props {
    children?: React.ReactElement;
}

const DottedBackground = ({ children }: Props) => {
    return <div className="h-screen bg-black bg-dotted-spacing-[40px] bg-dotted-[#2c1c2c]">{children}</div>;
};

export default DottedBackground;
//  <main >

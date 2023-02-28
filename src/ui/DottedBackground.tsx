import React from 'react';

interface Props {
    children?: React.ReactElement;
    color?: string;
}

const DottedBackground = ({ children, color = '#2c1c2c' }: Props) => {
    return <div className={`h-screen bg-black bg-dotted-spacing-[40px] bg-dotted-[${color}]`}>{children}</div>;
};
export default DottedBackground;
//  <main >

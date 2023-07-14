import React from 'react'
import { twMerge } from 'tailwind-merge';

type Props = {
    children: React.ReactNode;
    className?: string;
}

function Header({children, className}: Props) {
  return (
    <div className={twMerge(
        `h-fit bg-gradient-to-b from-gray-700 p-6`, className
    )}>
      {children}
    </div>
  )
}

export default Header
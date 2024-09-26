'use client';
import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    const moveCursor = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`,
      }, {
        duration: 500,
        fill: 'forwards',
      });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>
    </>
  );
};

export default CustomCursor;

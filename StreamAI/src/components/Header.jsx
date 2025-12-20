import React from 'react'

const Header = () => {
  return (
     <div className='absolute px-8 py-2 bg-linear-to-b from-black w-full'>
      <svg width="350" height="100" viewBox="0 0 350 100" xmlns="http://www.w3.org/2000/svg" 
      className='w-44'
      >
  <text x="10" y="70" font-family="Helvetica, Arial, sans-serif" font-weight="900" font-size="65" fill="#E50914" style={{ letterSpacing: '-3px' }}>
    StreamAi
  </text>
</svg>
    </div>
  )
}

export default Header
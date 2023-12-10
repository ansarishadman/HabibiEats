import React from 'react'

const Shimmer = () => {
  return (
    <div className='flex flex-wrap bg-gray-500'>
        {Array(20).fill('').map((e, i) => <div key={i} className='h-40 w-56'></div>)}
    </div>
  )
}

export default Shimmer;
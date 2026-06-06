import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='border-base-content/10  bg-black border-b border-gray-800'>
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>ThinkBoard</h1>
                <div className='flex items-center gap-4'>
                    <Link to={"/create"} className="btn btn-primary">
                        <PlusIcon className="size-5"/>
                        <span>New Note</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar;

'use client'
import React from 'react'
import NewChat from './NewChat'
import { useSession, signOut } from 'next-auth/react'

function Siderbar() {
  const {data: session} = useSession()
  return (
    <div className='p-2 flex flex-col h-screen'>
        <div className='flex-1'>
            <div>
                {/* New chat */}
                <NewChat/>

                <div>
                    {/* Selection Mode */}
                </div>
                {/* Map through the ChatRows */}
            </div>
        </div>
        {session && (
          <img onClick={() => signOut()} src={session.user?.image!} alt="Profile pic" className='h-12 w-12 mx-auto mb-2 hover:opacity-50 rounded-full cursor-pointer'/>
          
        )}
    </div>
  )
}

export default Siderbar
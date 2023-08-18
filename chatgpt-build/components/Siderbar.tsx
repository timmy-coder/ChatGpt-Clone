'use client'
import React from 'react'
import NewChat from './NewChat'
import { useSession, signOut } from 'next-auth/react'
import {useCollection} from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore'
import { db } from '@/firebase'
import ChatRow from './ChatRow'

function Siderbar() {
  const {data: session} = useSession()
  const [chats, loading, error] = useCollection(
    session && collection(db, "users", session.user?.email!, "chats")
  )
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
                {chats?.docs.map(chat => (
                  <ChatRow key={chat.id} id={chat.id}/>
                ))}
            </div>
        </div>
        {session && (
          <img onClick={() => signOut()} src={session.user?.image!} alt="Profile pic" className='h-12 w-12 mx-auto mb-2 hover:opacity-50 rounded-full cursor-pointer'/>
          
        )}
    </div>
  )
}

export default Siderbar
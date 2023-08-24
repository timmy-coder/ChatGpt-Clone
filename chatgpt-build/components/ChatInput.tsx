'use client'
import { db } from '@/firebase'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast/headless'
type Props = {
    chatId: string,
}

function ChatInput({chatId}: Props) {
  const [prompt, setprompt] = useState("")
  const {data: session} = useSession()

  // useSWR to get model

  const model = "text-davinci-003"

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!prompt) return;

    const input = prompt.trim();
    setprompt("")

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      }
    }

    await addDoc(collection(db, "users", session?.user?.email!, 'chats', chatId, 'messages'),
          message
    )

    // Toast notification
    const notification = toast.loading('chatGPT is thinking..')

    await fetch('/api/askQuestion', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: input, chatId, model, session
      })
    }).then(() => {
      //Toast notification to say successful
      toast.success('Chatgpt has reponded', {
        id: notification,
      })
    })

  }


  return (
    <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm'>
      <form onSubmit={sendMessage} className='p-5 space-x-5 flex'>
        <input disabled={!session} className='bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300 flex-1' value={prompt} onChange={e => setprompt(e.target.value)} type="text" placeholder='Type your message here...' />
        <button className='bg-[#11A37F] disabled:bg-gray-300 disabled:cursor-not-allowed hover:opacity-50 text-white font-bold px-4 py-2 rounded' disabled={!prompt || !session} type='submit'>
          <PaperAirplaneIcon className='h-4 w-4 -rotate-45'/>
        </button>
      </form>

      <div>
        {/* ModelSelection */}
      </div>
    </div>
  )
}

export default ChatInput
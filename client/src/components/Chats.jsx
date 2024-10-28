import React, { useEffect, useRef, useState } from 'react'
import { createNewChatAPI, getMessageAPI, getUserChatsAPI, sendMessageAPI } from '../Services/allAPI'
import { MDBTextArea } from 'mdb-react-ui-kit'
import { io } from "socket.io-client"
import { useParams } from 'react-router-dom'

function Chats() {
  const [chatMember, setChatMember] = useState([])
  const [userId, setUserId] = useState('')
  const [friendsProfile, setFriendProfiles] = useState([]) 
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessages, setNewMessages] = useState('')
  const scrollRef = useRef()
  const [socket, setSocket] = useState(null)
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const { shopId } = useParams()
  const [activeChatId, setActiveChatId] = useState(null);
  
  useEffect(() => {
    if (shopId ) {
      console.log(shopId);
      

      const chat = chatMember.find(chat => chat.members.includes(shopId))
      if(chat){
        setCurrentChat(chat)
        

      }else{
        createConversation()
        
      }

    }
  }, [shopId, chatMember,])

  
  

  const createConversation = async () => {

    try {
      if (userId && shopId){

        
        const newConversationData = {
          senderId: userId,  
          reciverId: shopId,  
        }
        const response= await createNewChatAPI(newConversationData)
        if (response.status===200) {
          
          const newChat = response.data;  
          setCurrentChat(newChat);
          setChatMember(prevChats => {
            if (!prevChats.some(chat => chat._id === newChat._id)) {
              return [...prevChats, newChat];
            }
            return prevChats;
          })
          getchatsMembers()
          
        }
      }
    } catch (e) {
      console.log(e)
      
    }  
  }

  useEffect(() => {
    setSocket(io("http://localhost:8900"))
    console.log('Socket connected.')
  }, [])

  useEffect(() => {
    socket?.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      })
    })

    return () => {
      socket?.off('getMessage')  
    }
  }, [socket])

  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage])
    }
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket?.emit('addUser', userId)
  }, [socket, userId])

  useEffect(() => {
    
    getchatsMembers()
  }, [])
  const getchatsMembers = async () => {
    const token = sessionStorage.getItem('token')

    const reqHeader = {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
    const Members = await getUserChatsAPI(reqHeader)

    if (Members.status === 200) {
      const { Chats, userId, friendsProfile } = Members.data
      console.log(friendsProfile)
      setFriendProfiles(friendsProfile)
      setChatMember(Chats)
      setUserId(userId)
    } else {
      console.log('Error fetching chat members.')
    }
  }


  const getMessages = async () => {
    if (!currentChat) return

    try {
      const messagesResponse = await getMessageAPI(currentChat._id)

      if (messagesResponse.status === 200) {
        setMessages(messagesResponse.data)
      } else {
        console.log('Failed to fetch messages')
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  useEffect(() => {
    getMessages()
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const receiverId = currentChat.members.find(member => member !== userId)

    socket?.emit('sendMessage', {
      senderId: userId,
      text: newMessages,
      receiverId,
    })

    const messagedata = {
      senderId: userId,
      receiverId,
      text: newMessages,
      conversationId: currentChat._id
    }

    try {
      const result = await sendMessageAPI(messagedata)
      setMessages([...messages, result.data])
      setNewMessages("")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <div className="row m-0 " style={{ height: '100vh' }}>
        <div className='col-6 m-0 d-flex align-item-center flex-column justify-content-between'>
          {currentChat ? (
            <div className='messageScrollbar' style={{ maxHeight: '70vh', overflowY: 'auto', padding: '10px' }}>
              {messages.length > 0 ? (
                messages.map((message, index) => {
                  const mine = message?.senderId === userId
                  return (
                    <div ref={scrollRef} key={index} className={`d-flex ${mine ? 'justify-content-end' : 'justify-content-start'}`}>
                      <p className={`message ${mine ? 'my-message' : 'their-message'}`}>
                        {message?.text}
                      </p>
                    </div>
                  )
                })
              ) : (
                <p className='d-flex align-items-center justify-content-center m-0'>No messages yet.</p>
              )}
            </div>
          ) : (
            <div className='d-flex align-items-center justify-content-center m-0'>Select a chat to see messages.</div>
          )}
          {currentChat ? (
            <div className="d-flex gap-3 align-items-center mb-3" >
              <MDBTextArea 
                onChange={(e) => setNewMessages(e.target.value)}
                label="Message"
                id="textAreaExample"
                rows={5}
                value={newMessages}
              />
              <button className='btn messageButton' onClick={handleSubmit}>Send</button>
            </div>
          ) : null}
        </div>
        <div className="col-6 shadow m-0">
          {chatMember.map((chatData) => {
            const friendId = chatData.members.find(member => member !== userId)
            const friendProfile = friendsProfile.find(profile => profile._id === friendId)
            const isActive = activeChatId === chatData._id;
            console.log(friendProfile);
            
            return (
              <div key={chatData._id} className='d-flex flex-row align-items-center' onClick={() => {setCurrentChat(chatData);setActiveChatId(chatData._id)}}>
                <div className={`members py-2 rounded-pill ps-4 ${isActive ? 'active-chat' : ''}`}>
                  <img className='rounded-circle'
                  
                    width={'50px'} height={'50px'}
                    src={
                      friendProfile?.profileimage
                        ? `${friendProfile.profileimage}`
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                     alt='img error'
                    style={{ marginRight: '10px' }}
                  />
                  {friendProfile?.shopname || friendProfile?.username }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Chats

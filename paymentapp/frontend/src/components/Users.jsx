import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  const [filter, setFilter] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/bulk?filter=${filter}`)
      .then((response) => {
        setUsers(response.data.user)
      })
      
      .catch((err) => {
        console.log(err)
      })
  }, [filter])

  return (
    <div className='flex flex-col p-4'>
      <div className='font-bold text-2xl'>Users</div>

      <input
        type="text"
        placeholder="Search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className='shadow rounded-md p-2 mt-2'
      />

      <div className='mt-4 space-y-2'>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

const User = ({ user }) => {
  const navigate = useNavigate()

  return (
    <div className='flex justify-between items-center p-2  rounded-md'>
      <div className='flex items-center gap-2'>
        <div className='bg-slate-400 text-white h-8 w-8 flex items-center justify-center rounded-full'>
          {user.firstName[0]}
        </div>
        <div>{user.firstName} {user.lastName}</div>
      </div>

      <button
        onClick={() => navigate(`/transfer?id=${user.id}&firstName=${user.firstName}`)}
        className='bg-black text-white px-4 py-1 rounded-md'
      >
        Send
      </button>
    </div>
  )
}

export default Users

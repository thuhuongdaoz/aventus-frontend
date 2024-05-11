import React from 'react'
import Header from '../layout/Header'
import ProfileCandidate from '../profile/ProfileCandidate'
import ProfileEmployer from '../profile/ProfileEmployer'

const Profile = () => {
  const role = localStorage.getItem('role')
  // console.log(localStorage.getItem('role'))  
  return (
    <>
      <Header/>
      {role === "CANDIDATE" ? <ProfileCandidate /> : <ProfileEmployer />}
    </>
  )
}

export default Profile
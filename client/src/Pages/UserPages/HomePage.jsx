import React from 'react'
import Header from '../../Components/UserComponent/Header'
import Footer from '../../Components/UserComponent/Footer'
import UserBody from '../../Components/UserComponent/UserBody'

function HomePage() {
  console.log(`**** HomePage *****`)
  return (
    <div>
      <Header />
      <UserBody />
      <Footer />
    </div>
  )
}

export default HomePage

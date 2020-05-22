import React, { useEffect } from 'react'
import { APP_NAME } from '../StringConstants'

const HomePage = () => {

  useEffect(() => {
    document.title = `Home | ${APP_NAME}`
  }, [])

  return (
    <div>
      Welcome to CarSayWah
    </div>
  )
}

export default HomePage

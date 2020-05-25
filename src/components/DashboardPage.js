import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { APP_NAME } from '../constants/StringConstants'
import { getSession } from '../util/SessionUtil'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#d2ffc7',
    padding: '60px 0 60px 0',
  },
}))

const DashboardPage = () => {

  const s = useStyles()
  const currentSession = getSession()

  useEffect(() => {
    document.title = `Dashboard | ${APP_NAME}`

    console.log(currentSession)
  }, [currentSession])

  return (
    <Box className={s.root}>
      <Typography variant="h2">
        Welcome, {currentSession.username}!
      </Typography>
    </Box>
  )
}

export default DashboardPage

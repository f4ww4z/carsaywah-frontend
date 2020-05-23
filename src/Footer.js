import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#504f4f',
    color: '#ffffff',
    padding: '16px',
  },
})

const Footer = () => {
  const s = useStyles()

  return (
    <Box className={s.root}>
      <Typography variant="h6">
        Pricing
      </Typography>
      <Typography variant="h6">
        About Us
      </Typography>
      <Typography variant="h6">
        Contact Us
      </Typography>
      <Typography variant="h6">
        +6013131914
      </Typography>
    </Box>
  )
}

export default Footer

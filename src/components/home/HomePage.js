import React, { useEffect } from 'react'
import { APP_NAME } from '../../constants/StringConstants'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CAR_SHARING_IMAGE_PATH from '../../_assets/carsharing.png'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    marginBottom: '16px',
  },
  topHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    padding: '30px 0 20px 0',
    backgroundColor: '#caffd8',
  },
  middleHeader: {
    display: 'flex',
    backgroundImage: `url(${CAR_SHARING_IMAGE_PATH})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '300px',
    width: '100%',
    alignItems: 'end',
    '& button': {
      height: 'max-content',
      marginBottom: '16px',
    },
  },
  middleHeaderButtonGetStarted: {
    marginLeft: '16px',
    marginRight: '8px',
  },
})

const HomePage = () => {

  const s = useStyles()

  useEffect(() => {
    document.title = `Home | ${APP_NAME}`
  }, [])

  return (
    <Box className={s.root}>
      <Box className={s.topHeader}>
        <Container>
          <Typography variant="h2" component="h2" gutterBottom>
            Easily rent cars near you
          </Typography>
        </Container>
      </Box>
      <Box className={s.middleHeader}>
        <Container>
          <Button className={s.middleHeaderButtonGetStarted}
                  variant="contained"
                  size="large"
                  color="secondary">
            Get Started
          </Button>
          <Button size="large" variant="contained">
            Pricing
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

export default HomePage

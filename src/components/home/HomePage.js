import React, { useEffect } from 'react'
import styled from 'styled-components'
import { APP_NAME } from '../../constants/StringConstants'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CAR_SHARING_IMAGE_PATH from '../../_assets/carsharing.png'
import { FlexBox } from '../CommonViews'
import jeep from '../../_assets/jeep.png'
import convertible from '../../_assets/convertible.png'
import sedan from '../../_assets/sedan.png'
import suv from '../../_assets/suv.png'

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
    alignItems: 'flex-end',
    '& button': {
      height: 'max-content',
      marginBottom: '16px',
    },
  },
  middleHeaderButtonGetStarted: {
    marginLeft: '16px',
    marginRight: '8px',
    marginBottom: '16px',
  },
})

const CarIconContainer = styled(FlexBox)`
  width: 100%;
  max-width: 700px;
  justify-content: center;
`

const CarIconView = styled(FlexBox)`
  flex-flow: column nowrap;
  align-items: center;
  margin: 20px;
`

const HomePage = () => {

  const s = useStyles()

  useEffect(() => {
    document.title = `Home | ${APP_NAME}`
  }, [])

  return (
    <Box className={s.root}>
      <Box className={s.topHeader}>
        <Container>
          <Typography align="center" variant="h2" component="h2" gutterBottom>
            Easily rent cars near you
          </Typography>
        </Container>
      </Box>
      <Box className={s.middleHeader}>
        <Container>
          <Button className={s.middleHeaderButtonGetStarted}
                  variant="contained"
                  size="large"
                  href="/register"
                  color="secondary">
            Get Started
          </Button>
          <Button size="large" variant="contained">
            Pricing
          </Button>
        </Container>
      </Box>
      <FlexBox flexflow="column nowrap" justify="center" align="center" style={{ backgroundColor: 'white' }}>
        <Typography variant="h2" color="primary" align="center" style={{ margin: '20px 0 20px 0' }}>
          A car for everyone
        </Typography>
        <CarIconContainer>
          <CarIconView>
            <img src={jeep} alt="jeep" width={300}/>
            <Typography variant="h5" color="primary" align="center">
              Jeep
            </Typography>
          </CarIconView>
          <CarIconView>
            <img src={sedan} alt="sedan" width={300}/>
            <Typography variant="h5" color="primary" align="center">
              Sedan
            </Typography>
          </CarIconView>
          <CarIconView>
            <img src={suv} alt="suv" width={300}/>
            <Typography variant="h5" color="primary" align="center">
              SUV
            </Typography>
          </CarIconView>
          <CarIconView>
            <img src={convertible} alt="convertible" width={300}/>
            <Typography variant="h5" color="primary" align="center">
              Convertible
            </Typography>
          </CarIconView>
        </CarIconContainer>
      </FlexBox>
    </Box>
  )
}

export default HomePage

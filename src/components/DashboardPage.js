import React, { useEffect } from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { APP_NAME } from '../constants/StringConstants'
import { getSession } from '../util/SessionUtil'
import { deleteCar, getAuthenticatedUserCars } from '../_handlers/CarHandler'
import { FlexBox, FlexBreak, FlexContainer } from './CommonViews'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  myCars: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: '30px',
    marginTop: '30px',
    backgroundColor: 'white',
  },
  myCarsTitle: {
    margin: '30px 0 30px 0',
  },
}))

const RootView = styled(FlexContainer)`
    padding: 60px 0 60px 0;
`

const CarView = styled(FlexBox)`
  padding: 20px;
  margin: 10px 0 0 0;
  background-color: #f0ffe9;
  border: 2px solid #dcdcdc;
  border-radius: 16px;
`

const CarDetailView = styled(FlexBox)`
  margin-left: 20px;
`

const CarButtonsView = styled(FlexBox)`
  width: 100%;
  justify-content: flex-end;
`

const DashboardPage = () => {

  const s = useStyles()
  const currentSession = getSession()

  const [myCars, setMyCars] = React.useState([])

  useEffect(() => {
    document.title = `Dashboard | ${APP_NAME}`
  }, [])

  useEffect(() => {
    fetchMyCars()
  }, [])

  const fetchMyCars = async () => {
    setMyCars([])
    const myFetchedCars = await getAuthenticatedUserCars()
    setMyCars(myFetchedCars)
  }

  // console.log(myCars)

  return (
    <RootView justify="center">
      <Typography variant="h2" align="center" style={{ marginBottom: '16px' }}>
        Welcome, {currentSession.username}!
      </Typography>
      <FlexBreak/>
      <FlexBox justify="center">
        <Button size="large"
                variant="contained"
                color="secondary"
                style={{ height: '60px' }}
                href="/rent">
          Rent a Car
        </Button>
      </FlexBox>
      <FlexBreak/>
      <Box className={s.myCars}>
        <Typography className={s.myCarsTitle} variant="h3">
          My Cars
        </Typography>
        <Button style={{ alignSelf: 'flex-end' }}
                variant="contained"
                color="primary"
                href="/car/new">
          Add New Car
        </Button>
        {myCars.length <= 0 ?
          <CircularProgress color="primary"/>
          :
          myCars.map(car => (
            <CarView key={car['id']}>
              <img src={require('../_assets/car_icon.png')}
                   width={100}
                   height={100}
                   alt="car icon"/>
              <CarDetailView>
                <Typography variant="h5">
                  {car['brand']}
                </Typography>
                <FlexBreak/>
                <Typography variant="h5">
                  {car['platNo']}
                </Typography>
                <FlexBreak/>
                <Typography variant="h5">
                  Capacity: <b>{car['capacity']} persons</b>
                </Typography>
              </CarDetailView>
              <CarButtonsView>
                <Button variant="contained"
                        color="secondary"
                        href={`/car/update/${car['id']}`}
                        style={{ marginRight: '10px' }}>
                  Edit
                </Button>
                <Button
                  onClick={async () => {
                    const result = await deleteCar(car['id'])
                    console.log(result)
                    fetchMyCars()
                  }}
                  variant="contained">
                  Remove
                </Button>
              </CarButtonsView>
            </CarView>
          ))
        }
      </Box>
    </RootView>
  )
}

export default DashboardPage

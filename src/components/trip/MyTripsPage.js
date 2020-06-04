import React, { useEffect } from 'react'
import { FlexBox, FlexBreak, FlexContainer } from '../CommonViews'
import Typography from '@material-ui/core/Typography'
import { APP_NAME } from '../../constants/StringConstants'
import styled from 'styled-components'
import { getMyTrips } from '../../_handlers/TripHandler'
import carIcon from '../../_assets/car_icon.png'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const RootView = styled(FlexContainer)`
    padding: 60px 0 60px 0;
    justify-content: center;
`

const TripView = styled(FlexContainer)`
  padding: 20px;
  margin: 10px 0 0 0;
  background-color: ${props => props.bc};
  border: 2px solid #dcdcdc;
  border-radius: 16px;
`

const MyTripsPage = () => {
  const [myTrips, setMyTrips] = React.useState([])

  useEffect(() => {
    document.title = `Trip Details | ${APP_NAME}`
  }, [])

  useEffect(() => {
    fetchMyTrips()
  }, [])

  const fetchMyTrips = async () => {
    setMyTrips([])
    const myFetchedTrips = await getMyTrips()
    console.log(myFetchedTrips)
    setMyTrips(myFetchedTrips)
  }

  return (
    <RootView>
      <Typography variant="h1" align="center" style={{ margin: '40px 0 40px 0' }}>
        My Trips
      </Typography>
      <FlexBreak/>
      <FlexContainer>
        {myTrips.length <= 0 ?
          <CircularProgress color="primary"/>
          :
          myTrips.map(trip => {
            const { id, startlocation, endlocation, status } = trip
            const { brand, platNo } = trip.car
            return (
              <TripView key={id} flexflow="column nowrap" bc={status === 'Active' ? '#ffecc1' : '#cdcdcd'}>
                <FlexBox>
                  <img src={carIcon}
                       width={100}
                       height={100}
                       alt="car icon"/>
                  <Typography variant="h5" style={{ margin: '10px 20px 10px 20px' }}>
                    {brand}
                  </Typography>
                  <Typography variant="h5" color="secondary" style={{ margin: '10px 20px 10px 20px' }}>
                    {platNo}
                  </Typography>
                </FlexBox>
                <FlexBreak/>
                <Typography variant="h5" style={{ margin: '10px 0 10px 0' }}>
                  Start Location: <b>{startlocation}</b>
                </Typography>
                <FlexBreak/>
                <Typography variant="h5" style={{ margin: '10px 0 10px 0' }}>
                  End Location: <b>{endlocation}</b>
                </Typography>
                <FlexBreak/>
                <Button
                  href={`/trip/${id}`}
                  color="secondary"
                  variant="contained">
                  View
                </Button>
              </TripView>)
          })
        }
      </FlexContainer>
    </RootView>
  )
}

export default MyTripsPage
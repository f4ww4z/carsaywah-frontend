import React, { useEffect } from 'react'
import { FlexBox, FlexContainer } from '../CommonViews'
import Typography from '@material-ui/core/Typography'
import { APP_NAME } from '../../constants/StringConstants'
import styled from 'styled-components'
import { cancelTrip, getTrip } from '../../_handlers/TripHandler'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

const RootView = styled(FlexContainer)`
  background-color: white;
  padding-top: 60px;
  padding-bottom: 60px;
`

const TripDetailPage = (props) => {
  const { id } = props.match.params

  const [trip, setTrip] = React.useState(null)

  useEffect(() => {
    document.title = `Trip Details | ${APP_NAME}`
  }, [])

  useEffect(() => {
    fetchData(id)
  }, [id])

  const fetchData = async (id) => {
    const fetchedTrip = await getTrip(id)
    // console.log('fetched trip')
    // console.log(fetchedTrip)
    setTrip(fetchedTrip)
  }

  return (
    !!!trip ?
      <CircularProgress color="primary"/>
      :
      <RootView flexflow="column nowrap">
        <Typography variant="h3" style={{ marginBottom: '30px' }}>
          {trip['status']} Trip
        </Typography>
        <Typography variant="h4">
          Renter: <b>{trip['renter']}</b>
        </Typography>
        <Typography variant="h4">
          Start location: <b>{trip['startlocation']}</b>
        </Typography>
        <Typography variant="h4">
          End location: <b>{trip['endlocation']}</b>
        </Typography>
        {trip['status'] === 'Active' ?
          <Typography variant="h4" style={{ color: '#d80000' }}>
            TIME REMAINING: {trip.duration}
          </Typography>
          :
          <br/>
        }
        <Typography variant="h4">
          Price: RM {trip['price']}
        </Typography>
        <FlexBox>
          <Button
            style={{ marginRight: '10px' }}
            variant="contained"
            href="/trips">
            Go Back
          </Button>
          <Button
            onClick={async () => {
              const result = await cancelTrip(id)
              console.log(result)
              fetchData(id)
            }}
            color="secondary"
            disabled={trip['status'] !== 'Active'}
            variant="contained">
            {trip['status'] === 'Active' ? 'Finish Trip' : 'Finished'}
          </Button>
        </FlexBox>
      </RootView>
  )
}

export default TripDetailPage
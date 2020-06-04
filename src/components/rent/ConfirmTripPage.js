import React, { useEffect } from 'react'
import { cssFlexMixin, FormButtons, RootFlexView, StyledTextField } from '../CommonViews'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { APP_NAME } from '../../constants/StringConstants'
import { getCar } from '../../_handlers/CarHandler'
import CircularProgress from '@material-ui/core/CircularProgress'
import { newTrip } from '../../_handlers/TripHandler'
import { Redirect } from 'react-router'

const ConfirmBookingForm = styled.form`
  ${cssFlexMixin} {
    padding: 50px 30px 50px 30px;
    background-color: #e5fce3;
    border-radius: 10px;
    justify-content: flex-start;
  }
`

const ConfirmTripPage = (props) => {

  const { carId } = props.match.params
  const { register, handleSubmit, errors } = useForm()

  const [loading, setLoading] = React.useState(false)
  const [tripId, setTripId] = React.useState(-1)
  const [car, setCar] = React.useState(null)

  useEffect(() => {
    document.title = `Confirm Booking | ${APP_NAME}`
  }, [])

  useEffect(() => {
    async function fetchData () {
      const fetchedCar = await getCar(carId)
      setCar(fetchedCar)
      console.log(fetchedCar)
    }

    fetchData()
  }, [carId])

  const onSubmit = async (data) => {
    setLoading(true)

    const { startLocation, endLocation, duration } = data
    const price = Number(duration) * 10

    const result = await newTrip(carId, startLocation, endLocation, duration, price)
    console.log(result)

    setTripId(result['id'])
  }

  return (tripId > 0 ?
      <Redirect to={{ pathname: `/trip/${tripId}` }}/>
      :
      <RootFlexView justify="center">
        {!!!car ?
          <CircularProgress color="primary"/>
          :
          <ConfirmBookingForm flexflow="column nowrap" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h3">
              Rent this Car?
            </Typography>
            <StyledTextField
              name="platNo"
              type="text"
              label="Plat Number"
              InputProps={{
                readOnly: true
              }}
              inputRef={register({ required: true })}
              error={!!errors.platNo}
              defaultValue={car['platNo']}
            />
            <StyledTextField
              name="brand"
              type="text"
              label="Car Brand"
              InputProps={{
                readOnly: true
              }}
              inputRef={register({ required: true })}
              error={!!errors.brand}
              defaultValue={car['brand']}
            />
            <StyledTextField
              name="capacity"
              type="number"
              label="Capacity (persons)"
              InputProps={{
                readOnly: true
              }}
              inputRef={register({ required: true })}
              error={!!errors.capacity}
              defaultValue={car['capacity']}
            />
            <StyledTextField
              name="startLocation"
              type="text"
              label="Start Location"
              InputProps={{
                readOnly: true
              }}
              inputRef={register({ required: true })}
              error={!!errors.startLocation}
              defaultValue={car['location']}
            />
            <StyledTextField
              name="endLocation"
              type="text"
              label="End Location"
              inputRef={register({ required: true })}
              error={!!errors.endLocation}
            />
            <StyledTextField
              name="duration"
              type="number"
              label="Duration (in hours)"
              inputRef={register({ required: true })}
              error={!!errors.duration}
            />
            <FormButtons backUrl="/rent" disabled={loading} submitText="Rent"/>
          </ConfirmBookingForm>
        }
      </RootFlexView>
  )
}

export default ConfirmTripPage
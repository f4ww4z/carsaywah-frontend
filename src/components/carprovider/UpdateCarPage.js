import React, { useEffect } from 'react'
import styled from 'styled-components'
import { cssFlexMixin, FlexContainer, FormButtons, StyledTextField } from '../CommonViews'
import { APP_NAME } from '../../constants/StringConstants'
import { useForm } from 'react-hook-form'
import Typography from '@material-ui/core/Typography'
import { getCar, updateCar } from '../../_handlers/CarHandler'
import CircularProgress from '@material-ui/core/CircularProgress'
import { toast } from 'react-toastify'

const RootView = styled(FlexContainer)`
    justify-content: center;
    padding: 60px 0 60px 0;
`

const UpdateCarForm = styled.form`
  ${cssFlexMixin} {
    padding: 50px 30px 50px 30px;
    background-color: #e5fce3;
    border-radius: 10px;
    justify-content: flex-start;
  }
`

const UpdateCarPage = (props) => {

  const { id } = props.match.params
  const { register, handleSubmit, errors } = useForm()

  const [loading, setLoading] = React.useState(false)
  const [car, setCar] = React.useState(null)

  useEffect(() => {
    document.title = `Update Car | ${APP_NAME}`
  }, [])

  useEffect(() => {
    async function fetchData () {
      const fetchedCar = await getCar(id)
      setCar(fetchedCar)
      console.log(fetchedCar)
    }

    fetchData()
  }, [id])

  const onSubmit = async (data) => {
    setLoading(true)

    const { platNo, brand, capacity, location } = data

    const updatedCar = await updateCar(id, platNo, brand, capacity, location)

    if (!!updatedCar.status) {
      setLoading(false)
      toast.error('Cannot update car at this time')
      return
    }

    setLoading(false)
    toast.success('Successfully updated car!')
  }

  return (
    <RootView>
      {!!!car ?
        <CircularProgress color="primary"/>
        :
        <UpdateCarForm flexflow="column nowrap" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h3">
            Update Car
          </Typography>
          <StyledTextField
            name="platNo"
            type="text"
            label="Plat Number"
            inputRef={register({ required: true })}
            error={!!errors.platNo}
            defaultValue={car['platNo']}
          />
          <StyledTextField
            name="brand"
            type="text"
            label="Car Brand"
            inputRef={register({ required: true })}
            error={!!errors.brand}
            defaultValue={car['brand']}
          />
          <StyledTextField
            name="capacity"
            type="number"
            label="Capacity (persons)"
            inputRef={register({ required: true })}
            error={!!errors.capacity}
            defaultValue={car['capacity']}
          />
          <StyledTextField
            name="location"
            type="text"
            label="Location"
            inputRef={register({ required: true })}
            error={!!errors.location}
            defaultValue={car['location']}
          />
          <FormButtons backUrl="/dashboard" disabled={loading} submitText="Update"/>
        </UpdateCarForm>
      }
    </RootView>
  )
}

export default UpdateCarPage
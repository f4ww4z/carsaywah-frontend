import React, { useEffect } from 'react'
import styled from 'styled-components'
import { cssFlexMixin, FlexBreak, FlexContainer, FormButtons, StyledTextField } from '../CommonViews'
import { APP_NAME } from '../../constants/StringConstants'
import { useForm } from 'react-hook-form'
import Typography from '@material-ui/core/Typography'
import { addNewCar } from '../../_handlers/CarHandler'
import { Redirect } from 'react-router'
import { toast } from 'react-toastify'

const RootView = styled(FlexContainer)`
    justify-content: center;
    padding: 60px 0 60px 0;
`

const NewCarForm = styled.form`
  ${cssFlexMixin} {
    padding: 50px 30px 50px 30px;
    background-color: #e5fce3;
    border-radius: 10px;
    justify-content: flex-start;
  }
`

const NewCarPage = () => {

  useEffect(() => {
    document.title = `New Car | ${APP_NAME}`
  }, [])

  const { register, handleSubmit, errors } = useForm()

  const [loading, setLoading] = React.useState(false)
  const [hasMadeNewCar, setHasMadeNewCar] = React.useState(false)

  const onSubmit = async (data) => {
    setLoading(true)

    const { platNo, brand, capacity } = data

    const newCar = await addNewCar(platNo, brand, capacity)

    if (Object.values(newCar).length === 0) {
      setLoading(false)
      toast.error('Cannot add new car at this time. Please try again.')
      return
    }

    // console.log(newCar)
    toast.success('Successfully added car.')
    setHasMadeNewCar(true)
  }

  return (hasMadeNewCar ?
      <Redirect to={{ pathname: '/dashboard' }}/>
      :
      <RootView>
        <FlexBreak/>
        <NewCarForm flexflow="column nowrap" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h3">
            Add a New Car
          </Typography>
          <StyledTextField
            name="platNo"
            type="text"
            label="Plat Number"
            inputRef={register({ required: true })}
            error={!!errors.platNo}
          />
          <StyledTextField
            name="brand"
            type="text"
            label="Car Brand"
            inputRef={register({ required: true })}
            error={!!errors.brand}
          />
          <StyledTextField
            name="capacity"
            type="number"
            label="Capacity (persons)"
            inputRef={register({ required: true })}
            error={!!errors.capacity}
          />
          <StyledTextField
            name="location"
            type="text"
            label="Location of car"
            inputRef={register({ required: true })}
            error={!!errors.location}
          />
          <FormButtons backUrl="/dashboard" disabled={loading} submitText="Add"/>
        </NewCarForm>
      </RootView>
  )
}

export default NewCarPage
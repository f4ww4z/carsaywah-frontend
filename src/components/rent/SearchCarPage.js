import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FlexBox, FlexBreak, FlexContainer } from '../CommonViews'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { searchCar } from '../../_handlers/CarHandler'
import { APP_NAME } from '../../constants/StringConstants'
import carIcon from '../../_assets/car_icon.png'

const RootView = styled(FlexContainer)`
    padding: 60px 0 60px 0;
    background-color: white;
`

const CarView = styled(FlexBox)`
  width: 100%;
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

const SearchCarPage = () => {

  const [searchBrand, setSearchBrand] = React.useState('')
  const [searchedCars, setSearchedCars] = React.useState([])

  useEffect(() => {
    document.title = `Rent a Car | ${APP_NAME}`
  }, [])

  useEffect(() => {
    fetchAllCars(searchBrand)
  }, [searchBrand])

  const fetchAllCars = async (brand) => {
    setSearchedCars([])
    const myFetchedCars = await searchCar({ brand: brand })
    console.log(myFetchedCars)
    setSearchedCars(myFetchedCars)
  }

  return (
    <RootView align="center" flexflow="column nowrap">
      <Typography variant="h2" style={{ marginBottom: '16px' }}>
        Find a Car to Rent
      </Typography>
      <TextField
        style={{ marginBottom: '16px' }}
        variant="outlined"
        value={searchBrand}
        placeholder="Search a car brand..."
        onChange={event => setSearchBrand(event.target.value)}
      />
      <FlexBox flexflow="column nowrap">
        {searchedCars.length <= 0 ?
          <CircularProgress color="primary"/>
          :
          searchedCars.map(car => (
            <CarView key={car['id']}>
              <img src={carIcon}
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
                <FlexBreak/>
                <Typography variant="h5">
                  Owner: <b>{car['owner']}</b>
                </Typography>
              </CarDetailView>
              <CarButtonsView>
                <Button variant="contained"
                        color="secondary"
                        href={`/rent/confirm/${car['id']}`}
                        style={{ marginRight: '10px' }}>
                  Rent
                </Button>
              </CarButtonsView>
            </CarView>
          ))
        }

      </FlexBox>
    </RootView>
  )
}

export default SearchCarPage
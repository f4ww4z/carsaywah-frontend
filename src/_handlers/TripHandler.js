import { sendRequest } from '../util/HandlerUtil'

export const newTrip = async (carId, startLocation, endLocation, duration, price) => {
  duration = `${duration}:00:00`

  const data = {
    car: carId,
    startlocation: startLocation,
    endlocation: endLocation,
    duration: duration,
    price: price
  }

  console.log('renting car')
  console.log(data)

  return sendRequest({ method: 'post', endpoint: 'trips', data: data })
}

export const getTrip = async (id) => {
  return sendRequest({ endpoint: `trips/${id}` })
}

export const getMyTrips = async () => {
  return sendRequest({ endpoint: 'mytrips' })
}

export const cancelTrip = async (tripId) => {
  return sendRequest({ method: 'put', endpoint: `trips/${tripId}/disable` })
}
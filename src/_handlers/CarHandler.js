import { sendRequest } from '../util/HandlerUtil'

export const getAuthenticatedUserCars = async () => {
  return sendRequest({ endpoint: 'mycars' })
}

export const addNewCar = async (platNo, brand, capacity) => {
  const data = {
    platNo: platNo,
    brand: brand,
    capacity: capacity,
  }

  return sendRequest({ method: 'post', endpoint: 'cars', data: data })
}

export const getCar = async (id) => {
  return sendRequest({ endpoint: `cars/${id}` })
}

export const updateCar = async (id, platNo, brand, capacity, location) => {
  const data = {
    platNo: platNo,
    brand: brand,
    capacity: capacity,
    location: location,
  }

  return sendRequest({ method: 'put', endpoint: `cars/${id}`, data: data })
}

export const deleteCar = async (id) => {
  return sendRequest({ method: 'delete', endpoint: `cars/${id}` })
}

export const searchCar = async ({ brand = ' ' }) => {
  if (brand === '') {
    brand = ' '
  }
  return sendRequest({ endpoint: `searchcar/${brand}` })
}
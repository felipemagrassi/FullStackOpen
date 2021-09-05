import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(res => res.data)
}

const create = ( Object ) => {
  const request =  axios.post(baseURL, Object)
  return request.then(response => response.data)
}             

const deleteUser = (id, Object) => {
  const request = axios.delete(`${baseURL}/${id}`, Object)
  return request.then(response => response.data)
}

const updatePhone = (id, Object) =>  {
  const request = axios.put(`${baseURL}/${id}`, Object)
  return request.then(response => response.data);
}
const personService = {
  getAll, 
  create,
  deleteUser,
  updatePhone
}

export default personService;

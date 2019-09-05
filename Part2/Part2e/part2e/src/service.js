import axios from 'axios'

const baseURL = '/api/persons'

const getAllPersons = () => {
  const req = axios.get(baseURL)
  return req.then(resp => resp.data)
}

const createPerson = newPerson => {
  const req = axios.post(baseURL, newPerson)
  return req.then(resp => resp.data)
}

const updatePerson = (person, id) => {
  const req = axios.put(`${baseURL}/${id}`, person)
  return req.then(resp => resp.data)
}

const deletePerson = id => {
  const req = axios.delete(`${baseURL}/${id}`)
  return req.then(resp => resp.data)
}

export default {getAllPersons, createPerson, updatePerson, deletePerson}
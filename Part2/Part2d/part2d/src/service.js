import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAllPersons = () => {
  const req = axios.get(url)
  return req.then(resp => resp.data)
}

const createPerson = newPerson => {
  const req = axios.post(url, newPerson)
  return req.then(resp => resp.data)
}

const updatePerson = (person, id) => {
  const req = axios.put(`${url}/${id}`, person)
  return req.then(resp => resp.data)
}

const deletePerson = id => {
  const req = axios.delete(`${url}/${id}`)
  return req.then(resp => resp.data)
}

export default {getAllPersons, createPerson, updatePerson, deletePerson}
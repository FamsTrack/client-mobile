import axios from 'axios'

const instance = axios.create({
  //baseURL: 'http://192.168.43.185:3000'
  //baseURL: 'http://192.168.1.3:3000'
  baseURL: 'https://famstrack.herokuapp.com'
})

export default instance

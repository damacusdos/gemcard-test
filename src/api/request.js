import Axios from 'axios'

const service = Axios.create({
  baseURL: 'https://data.montgomerycountymd.gov/resource/e54u-qx42.json'
})

const params = {
  $$app_token: 'D8zSK3YQscRF9ZveYwmXagPhK'
}

const api = {
  getAll: function() {
    return service({
      method: 'get',
      params
    })
  },
  getAllByType: function(type) {
    return service({
      url: `?animaltype=${type}`,
      method: 'get',
      params
    })
  },
  getSome: function(type, num, from) {
    return service({
      url: `?animaltype=${type}&$limit=${num}&$offset=${from}`,
      method: 'get',
      params
    })
  }
}

export default api

import axios = require('axios');

export const circleService = {
  get() {
    return axios.get<ICircleResponse>('/api/circle').then(res => res.data);
  }
  , post(name: string) {
    return axios.post<ICircleResponse>('/api/circle', { name }).then(res => res.data);
  }
}
export const profileService = {
  get() {
    return axios.get<IUser>('/api/profile').then(res => res.data);
  }
}
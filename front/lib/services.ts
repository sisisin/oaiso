import axios = require('axios');

export const circleService = {
  get() {
    return axios.get<{ id: string; name: string; twitter_id: string; }>('/api/circle').then(res => res.data);
  }
}
export const profileService = {
  get(){
    return axios.get<IUser>('/api/profile').then(res => res.data);
  }
}
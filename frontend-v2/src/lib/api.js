import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Production ready approach: standardizing request/response handling
export const electionApi = {
  getStates: () => api.get('/states').then(res => res.data.data),
  getPartiesByState: (stateName) => api.get(`/parties/state/${stateName}`).then(res => res.data.data),
  getElections: (stateName) => stateName 
    ? api.get(`/elections/state/${stateName}`).then(res => res.data.data)
    : api.get('/elections').then(res => res.data.data),
  getEvents: () => api.get('/events').then(res => res.data.data),
  sendMessage: (message) => api.post('/chat', { message }).then(res => res.data.data),
};

export default api;

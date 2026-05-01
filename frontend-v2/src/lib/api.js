import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Production ready approach: standardizing request/response handling
export const electionApi = {
  getStates: () => api.get('/states').then(res => res.data),
  getPartiesByState: (stateName) => api.get(`/parties/state/${stateName}`).then(res => res.data),
  getElections: (stateName) => stateName 
    ? api.get(`/elections/state/${stateName}`).then(res => res.data)
    : api.get('/elections').then(res => res.data),
  getEvents: () => api.get('/events').then(res => res.data),
  sendMessage: (message) => api.post('/chat', { message }).then(res => res.data),
};

export default api;

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? 'http://localhost:8080/api' : '');

export const isApiConfigured = Boolean(API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.hash = '/teacher/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const noticeService = {
  getLatest: () => api.get('/notices/latest'),
  getAll: (page = 0, size = 10, search = '') => 
    api.get('/notices', { params: { page, size, search } }),
  getById: (id) => api.get(`/notices/${id}`),
  create: (data) => api.post('/notices', data),
  update: (id, data) => api.put(`/notices/${id}`, data),
  delete: (id) => api.delete(`/notices/${id}`),
};

export const admissionService = {
  apply: (data) => api.post('/admissions/apply', data),
  getAll: (page = 0, size = 10, status = '') => 
    api.get('/admissions', { params: { page, size, status } }),
  getById: (id) => api.get(`/admissions/${id}`),
  updateStatus: (id, status) => api.put(`/admissions/${id}/status`, null, { params: { status } }),
};

export const enquiryService = {
  submit: (data) => api.post('/enquiries/submit', data),
  getAll: (status = '') => api.get('/enquiries', { params: { status } }),
  updateStatus: (id, status) => api.put(`/enquiries/${id}/status`, null, { params: { status } }),
};

export const facultyService = {
  getAll: () => api.get('/faculty'),
  getById: (id) => api.get(`/faculty/${id}`),
  create: (data) => api.post('/faculty', data),
  update: (id, data) => api.put(`/faculty/${id}`, data),
  delete: (id) => api.delete(`/faculty/${id}`),
};

export const teacherActivityService = {
  create: (data) => api.post('/teacher/activities', data),
  getMy: (page = 0, size = 10) => 
    api.get('/teacher/activities', { params: { page, size } }),
  getById: (id) => api.get(`/teacher/activities/${id}`),
  update: (id, data) => api.put(`/teacher/activities/${id}`, data),
  delete: (id) => api.delete(`/teacher/activities/${id}`),
};

export const homeworkService = {
  create: (data) => api.post('/teacher/homework', data),
  getMy: (page = 0, size = 10) => 
    api.get('/teacher/homework', { params: { page, size } }),
  getByClass: (className, page = 0, size = 10) => 
    api.get(`/teacher/homework/class/${className}`, { params: { page, size } }),
  update: (id, data) => api.put(`/teacher/homework/${id}`, data),
  delete: (id) => api.delete(`/teacher/homework/${id}`),
};

export const noteService = {
  upload: (formData) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_BASE_URL}/teacher/notes`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    }).then(res => res.data);
  },
  getMy: (page = 0, size = 10) => 
    api.get('/teacher/notes', { params: { page, size } }),
  getByClass: (className, page = 0, size = 10) => 
    api.get(`/teacher/notes/class/${className}`, { params: { page, size } }),
  delete: (id) => api.delete(`/teacher/notes/${id}`),
};

export default api;
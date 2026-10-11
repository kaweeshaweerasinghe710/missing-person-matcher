import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const reportMissingPerson = (data) =>
  API.post('/missing/report', data);

export const getAllMissingPersons = () =>
  API.get('/missing/all');

export const getActiveCases = () =>
  API.get('/missing/active');

export const reportFoundPerson = (data) =>
  API.post('/found/report', data);

export const getAllFoundPersons = () =>
  API.get('/found/all');

export const getUnmatchedPersons = () =>
  API.get('/found/unmatched');

export const markAsFound = (id) =>
  API.put(`/missing/${id}/found`);
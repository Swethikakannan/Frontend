// src/services/transactionService.js
import axios from "axios";

const API_URL = "https://localhost:7157/api/Transaction";

export const deposit = async (data) => {
  return await axios.post(`${API_URL}/deposit`, data);
};

export const withdraw = async (data) => {
  return await axios.post(`${API_URL}/withdraw`, data);
};

export const transfer = async (data) => {
  return await axios.post(`${API_URL}/transfer`, data);
};

export const getAllTransactions = async () => {
  return await axios.get(API_URL);
};

export const getTransactionById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const getTransactionsByAccountId = async (accountId) => {
  return await axios.get(`${API_URL}/account/${accountId}`);
};

export const getPagedTransactions = async (pageNumber, pageSize) => {
  return await axios.get(`${API_URL}/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`);
};

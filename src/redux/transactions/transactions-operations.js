import { createAsyncThunk } from '@reduxjs/toolkit';
import * as TransactionAPI from '../../services/transactionsAPI';

const fetchTransactionsList = createAsyncThunk(
  'transactions/getTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const transactions = await TransactionAPI.fetchTransactionsList();

      return transactions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
const fetchExpensesList = createAsyncThunk(
  'transactions/getExpenses',
  async (_, { rejectWithValue }) => {
    try {
      const expenses = await TransactionAPI.fetchTransactionsTypesList('expense');

      return expenses.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const fetchIncomesList = createAsyncThunk(
  'transactions/getIncomes',
  async (_, { rejectWithValue }) => {
    try {
      const incomes = await TransactionAPI.fetchTransactionsTypesList('income');

      return incomes.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transaction, { rejectWithValue }) => {
    try {
      const data = await TransactionAPI.createTransaction(transaction.transactionType, transaction);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
const deleteTransaction = createAsyncThunk(
  'transaction/deleteTransaction',
  async (id, { rejectWithValue }) => {
    try {
      await TransactionAPI.deleteTransaction(id);

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
const transactionOperations = {
  fetchTransactionsList,
  createTransaction,
  deleteTransaction,
  fetchExpensesList,
  fetchIncomesList,
};

export default transactionOperations;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:8080';

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => '/api/categories',
		}),
		getLabels: builder.query({
			query: () => '/api/labels',
		}),
		getTransactions: builder.query({
			query: () => '/api/transactions',
		}),
		addTransaction: builder.mutation({
			query: (initialTransaction) => ({
				url: '/api/transactions',
				method: 'POST',
				body: initialTransaction,
			}),
		}),
		deleteTransaction: builder.mutation({
			query: (transactionId) => ({
				url: '/api/transactions',
				method: 'DELETE',
				body: transactionId,
			}),
		}),
	}),
});

export default apiSlice;

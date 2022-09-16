import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = process.env.REACT_APP_API_URL;

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => '/api/categories',
			providesTags: ['categories'],
		}),
		getLabels: builder.query({
			query: () => '/api/labels',
			providesTags: ['transactions'],
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
			invalidatesTags: ['transactions'],
		}),
		deleteTransaction: builder.mutation({
			query: (transactionId) => ({
				url: '/api/transactions',
				method: 'DELETE',
				body: transactionId,
			}),
			invalidatesTags: ['transactions'],
		}),
	}),
});

export default apiSlice;

import React from 'react';
import { useForm } from 'react-hook-form';
import History from './History';
import { default as api } from '../store/apiSlice';

const Form = () => {
	const { register, handleSubmit, resetField } = useForm();
	const [addTransaction] = api.useAddTransactionMutation();

	const onSubmit = async (data) => {
		if (data.name === '') {
			alert('Please enter a valid Transaction description.');
			return;
		}

		if (data.amount === '') {
			alert('Please enter a valid Amount.');
			return;
		}

		await addTransaction(data).unwrap();

		resetField('name');
		resetField('amount');
	};

	return (
		<div className='form max-w-sm mx-auto w-96'>
			<h1 className='font-bold pb-4 text-xl'>Transaction</h1>
			<form id='form' onSubmit={handleSubmit(onSubmit)}>
				<div className='grid gap-4'>
					<div className='input-group'>
						<input
							type='text'
							placeholder='Salary, Rent, etc...'
							className='form-input'
							{...register('name')}
						/>
					</div>
					<select className='form-input' {...register('type')}>
						<option value='Investment' defaultValue>
							Investment
						</option>
						<option value='Expense'>Expense</option>
						<option value='Savings'>Savings</option>
					</select>
					<div className='input-group'>
						<input
							type='number'
							placeholder='Amount'
							className='form-input'
							min='0'
							{...register('amount')}
						/>
					</div>
					<div className='submit-btn'>
						<button className='border py-2 text-white bg-indigo-500 w-full'>
							Add Transaction
						</button>
					</div>
				</div>
			</form>
			<History />
		</div>
	);
};

export default Form;

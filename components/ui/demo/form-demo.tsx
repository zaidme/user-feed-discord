'use client';

import React from 'react';
import { Form } from '../form';
import { BaseInput } from '../base-input';
import { Button } from '../button';
import { generateForm } from '@/lib/form';
import { z } from 'zod';
import { Input } from '../input';
import { useToast } from "@/components/ui/use-toast"





const NotificationValues = [
	{
		label: 'All',
		value: 'all',
	},
	{
		label: 'Mentions',
		value: 'mentions',
	},
	{
		label: 'None',
		value: 'none',
	},
];
const CheckValues = [
	{
		label: 'Dune',
		id: 'dune-1',
	},
	{
		label: 'Dune Part 2',
		id: 'dune-2',
	},
	{
		label: 'Dune Messiah',
		id: 'dune-3',
	},
];
const FormDemo = () => {
	const { form, schema } = generateForm({
		schema: z.object({
			name: z.string().min(1),
			email: z.string().email('Please enter a valid email'),}
		)
			
	});

	const { toast } = useToast()

	type FormInference = z.infer<typeof schema>;
    

	const onSubmit = async (data: FormInference) => {
		toast({
			title: 'Success!',
			description: `Welcome to the demo ${data.name}!`,
	
		});
		console.log(data);
        console.log("submitted")
		
		try {
			const response = await fetch('/api/discord-notification', {
				method: 'GET',
			});

			const result = await response.json();
			if (result.ok) {
				console.log('Notification sent successfully');
			} else {
				console.error('Failed to send notification:', result.message);
			}
		} catch (error) {
			console.error('Error sending notification:', error);
		}



	};

    
   
	return (
		<div className='border rounded-xl w-1/4 p-4'>
			<p className='mb-5'>Ughhghgh</p>
			<Form
				form={form}
				onSubmit={form.handleSubmit(onSubmit)}
				className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground space-y-4'
			>
				<Input
					label='Name'
					type='name'
					field='name'
					control={form.control}
					placeholder='Paul Atreides'
				/>
				<Input
					label='Email'
					field='email'
					control={form.control}
					placeholder='paul@gmail.com'
				/>
				

				<div className='flex space-x-2'>
					<Button type='submit' onClick={() => onSubmit(form.control)}>Submit</Button>
				</div>
			</Form>
		</div>
	);
};

export default FormDemo;

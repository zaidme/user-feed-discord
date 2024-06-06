import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';
import { Control } from 'react-hook-form';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	control?: Control<any, any>;
	description?: string;
	field?: string;
	classNameInput?: string;
	icon?: React.ReactNode;
}

const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, label, classNameInput, icon, ...props }, ref) => {
		return (
			<div className={cn(className)}>
				{label && <Label>{label}</Label>}
				<input
					type={type}
					className={cn(
						'flex h-10 w-full bg-background px-3 py-2 text-sm ring-offset-background file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
						classNameInput
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
BaseInput.displayName = 'BaseInput';

export { BaseInput };

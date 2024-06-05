'use client';
import React from 'react';
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from './form';
import BaseEditor from './base-editor';

interface Props {
	control?: Control<any, any>;
	field?: string;
	label?: string;
	className?: string;
	classNameEditor?: string;
	defaultValue?: any;
	onInputChange?: (value: string) => void;
	maxLength?: number;
	placeholder?: string;
}

const Editor: React.FC<Props> = ({
	control,
	field,
	label,
	className,
	classNameEditor,
	defaultValue,
	onInputChange,
	maxLength,
	placeholder,
}) => {
	if (control && field) {
		return (
			<FormField
				control={control}
				name={field}
				render={({ field }) => (
					<FormItem className={className}>
						<FormControl>
							<BaseEditor
								onUpdate={(e) => {
									field.onChange(e);
								}}
								defaultValue={defaultValue}
								maxLength={maxLength}
								label={label}
								className={classNameEditor}
								placeholder={placeholder}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			></FormField>
		);
	}

	return (
		<BaseEditor
			onUpdate={(e) => {
				if (onInputChange) onInputChange(e);
			}}
			defaultValue={defaultValue}
			maxLength={maxLength}
			label={label}
			className={classNameEditor}
			placeholder={placeholder}
		/>
	);
};

export default Editor;

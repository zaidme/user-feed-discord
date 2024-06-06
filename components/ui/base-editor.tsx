'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ToolTip } from './tooltip';
import { Toggle } from './toggle';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';
import {
	Heading1,
	Heading2,
	Heading3,
	Bold,
	Italic,
	Underline as UnderlineIcon,
	Link as LinkIcon,
	List,
	ListOrdered,
} from 'lucide-react';
import { Label } from './label';

export interface Props {
	className?: string;
	label?: string;
	maxLength?: number;
	onUpdate: (value: string) => void;
	defaultValue?: string;
	placeholder?: string;
}

const BaseEditor: React.FC<Props> = ({
	className,
	label,
	maxLength,
	onUpdate,
	defaultValue,
	placeholder,
}) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			CharacterCount.configure({
				limit: maxLength,
			}),
			Placeholder.configure({
				placeholder: placeholder,
				showOnlyWhenEditable: false,
				emptyNodeClass:
					'first:before:h-0 first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none', //Placeholder styling that makes it magically work
			}),
		],
		content: defaultValue,
		editorProps: {
			attributes: {
				//this styles the textbox only, not the text menu
				class:
					'placeholder:text-muted-foreground px-3 py-2 body-text min-h-[65px]',
			},
		},
		onUpdate: ({ editor }) => {
			//saves the text here
			const html = editor.getHTML();
			if (onUpdate) {
				if (html === '<p></p>') {
					onUpdate('');
				} else {
					onUpdate(html.replaceAll('<p></p>', '<br>'));
				}
			}
		},
	});

	if (!editor) {
		return null;
	}

	return (
		<div className={className}>
			{label && <Label>{label}</Label>}
			<div className='min-h-[80px] w-full rounded-md border border-input bg-background text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50'>
				<div className='flex flex-wrap gap-x-1 gap-y-1 py-1 px-3'>
					<ToolTip text='Heading 1' side='bottom'>
						<div>
							<Toggle
								tabIndex={-1}
								onPressedChange={() =>
									editor.chain().toggleHeading({ level: 1 }).run()
								}
								className='h-auto p-1'
								pressed={editor.isActive('heading', { level: 1 })}
							>
								<Heading1 className='h-6 w-6 p-1' />
							</Toggle>
						</div>
					</ToolTip>
					<ToolTip side='bottom' text='Heading 2'>
						<div>
							<Toggle
								tabIndex={-1}
								onPressedChange={() =>
									editor.chain().toggleHeading({ level: 2 }).run()
								}
								className='h-auto p-1'
								pressed={editor.isActive('heading', { level: 2 })}
							>
								<Heading2 className='h-6 w-6 p-1' />
							</Toggle>
						</div>
					</ToolTip>
					<ToolTip side='bottom' text='Heading 3'>
						<div>
							<Toggle
								tabIndex={-1}
								onPressedChange={() =>
									editor.chain().toggleHeading({ level: 3 }).run()
								}
								className='h-auto p-1'
								pressed={editor.isActive('heading', { level: 3 })}
							>
								<Heading3 className='h-6 w-6 p-1' />
							</Toggle>
						</div>
					</ToolTip>
					<ToolTip side='bottom' text='Bold'>
						<div>
							<Toggle
								tabIndex={-1}
								onPressedChange={() =>
									editor.chain().toggleBold().run()
								}
								className='h-auto p-1'
								pressed={editor.isActive('bold')}
							>
								<Bold className='h-6 w-6 p-1' />
							</Toggle>
						</div>
					</ToolTip>
					<ToolTip side='bottom' text='Italic'>
						<div>
							<Toggle
								tabIndex={-1}
								onPressedChange={() =>
									editor.chain().toggleItalic().run()
								}
								className='h-auto p-1'
								pressed={editor.isActive('italic')}
							>
								<Italic className='h-6 w-6 p-1' />
							</Toggle>
						</div>
					</ToolTip>
					<ToolTip side='bottom' text='Underline'>
						<div>
							<Toggle
								tabIndex={-1}
								onPressedChange={() =>
									editor.chain().toggleUnderline().run()
								}
								className='h-auto p-1'
								pressed={editor.isActive('underline')}
							>
								<UnderlineIcon className='h-6 w-6 p-1' />
							</Toggle>
						</div>
					</ToolTip>
					{/* <ToolTip side='bottom' text='Link'>
											<Toggle
												tabIndex={-1}
												type='button'
												onClick={() => {
													setUrl(editor.getAttributes('link').href);
													onOpen();
												}}
												className={`${
													editor.isActive('link')
														? 'bg-palette-lighter'
														: 'hover:bg-gray-200'
												} ${'h-fit w-fit rounded font-bold'}`}
											>
                                                <LinkIcon />
											
											</Toggle>
										</ToolTip> */}
					<ToolTip side='bottom' text='Bulleted List'>
						<div>
							<Toggle
								tabIndex={-1}
								onPressedChange={() =>
									editor.chain().toggleBulletList().run()
								}
								className='h-auto p-1'
								pressed={editor.isActive('bulletList')}
							>
								<List className='h-6 w-6 p-1' />
							</Toggle>
						</div>
					</ToolTip>
					<ToolTip side='bottom' text='Numbered List'>
						<div>
							<Toggle
								tabIndex={-1}
								onPressedChange={() =>
									editor.chain().toggleOrderedList().run()
								}
								className='h-auto p-1'
								pressed={editor.isActive('orderedList')}
							>
								<ListOrdered className='h-6 w-6 p-1' />
							</Toggle>
						</div>
					</ToolTip>
				</div>

				<EditorContent editor={editor} />

				{maxLength && (
					<div className='mx-2 mt-1 opacity-50'>
						{editor.storage.characterCount.characters()}/{maxLength} characters
					</div>
				)}
			</div>
		</div>
	);
};

export default BaseEditor;

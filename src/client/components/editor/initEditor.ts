import type { SourceLocation } from 'src/types';

import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, basicSetup } from 'codemirror';

import './styles.css';

import { debounce } from '../../utils';
import { highlightPositions, highlightingExtension } from './highlightingExtension';

interface EditorProps {
	container: HTMLElement;
	initial: string;
	onChange: (source: string) => void;
}

export function initEditor ({ container, initial, onChange }: EditorProps) {
	if (initial) {
		onChange(initial);
	}

	const handleChange = debounce(onChange, 1000);

	const updateListenerExtension = EditorView.updateListener.of((update) => {
		if (update.docChanged) {
			handleChange(update.state.doc.toString());
		}
	});

	const editor = new EditorView({
		parent: container,
		state: EditorState.create({
			doc: initial,
			extensions: [
				highlightingExtension,
				basicSetup,
				javascript({ jsx: true, typescript: true }),
				oneDark,
				updateListenerExtension,
			],
		}),
	});

	const setSelected = (locs: SourceLocation[]) => {
		editor.dispatch({
			effects: highlightPositions(locs),
		});
	};

	return { setSelected };
}

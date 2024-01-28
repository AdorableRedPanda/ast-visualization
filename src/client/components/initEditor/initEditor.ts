import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, basicSetup } from 'codemirror';
import { SourceLocation } from 'src/types';

import { debounce } from '../../utils';
import { highlightPositions, highlightingExtension } from './highlightingExtension';
export function initEditor (container: HTMLElement, onChange: (source: string) => void, initial: string) {
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
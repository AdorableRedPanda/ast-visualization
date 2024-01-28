import { StateEffect, StateField } from '@codemirror/state';
import { Decoration } from '@codemirror/view';
import { EditorView } from 'codemirror';
import { SourceLocation } from 'src/types';

const setHighlight = StateEffect.define<SourceLocation>({});
const clearHighlights = StateEffect.define({});

export const highlightingExtension = StateField.define({
	create () {
		return Decoration.none;
	},
	provide: (field) => EditorView.decorations.from(field),
	update (decorations, tr) {
		let nextDecorations = decorations;

		for (const effect of tr.effects) {
			if (!effect.is(setHighlight) && !effect.is(clearHighlights)) {
				return decorations;
			}

			nextDecorations = decorations.update({ filter: () => false });

			if (effect.is(clearHighlights)) {
				return nextDecorations;
			}


			const highlights = Decoration
				.mark({ class: 'highlighted' })
				.range(effect.value.start.index, effect.value.end.index);

			nextDecorations = nextDecorations.update({ add: [ highlights ] });
		}

		return nextDecorations;
	},
});

export function highlightPositions (locs: SourceLocation[]) {
	if (!locs.length) {
		return clearHighlights.of(null);
	}

	return locs.map((loc) => setHighlight.of(loc));
}

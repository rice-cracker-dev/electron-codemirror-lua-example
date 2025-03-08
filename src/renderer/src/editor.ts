import { EditorState } from '@codemirror/state'
import { lintKeymap } from '@codemirror/lint'
import { defaultKeymap, history, historyKeymap, indentLess, insertTab } from '@codemirror/commands'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { vsCodeDark } from '@fsegurai/codemirror-theme-vscode-dark'
import { lua } from '@codemirror/legacy-modes/mode/lua'
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap
} from '@codemirror/autocomplete'
import {
  foldGutter,
  indentOnInput,
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  foldKeymap,
  StreamLanguage
} from '@codemirror/language'
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection
} from '@codemirror/view'
import { luaLanguageClient } from './languageClient'

export const createEditorState = (doc: string): EditorState =>
  EditorState.create({
    doc,
    extensions: [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      StreamLanguage.define(lua),
      luaLanguageClient,
      vsCodeDark,
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap,
        {
          key: 'Tab',
          preventDefault: true,
          run: insertTab
        },
        {
          key: 'Shift-Tab',
          preventDefault: true,
          run: indentLess
        }
      ])
    ]
  })

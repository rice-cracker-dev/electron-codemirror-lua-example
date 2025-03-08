<script lang="ts">
  import { EditorView } from '@codemirror/view'
  import { createEditorState } from './editor'

  let editorContainer: HTMLElement = $state<HTMLElement>()
  let editorView: EditorView = $state<EditorView>()

  $effect(() => {
    if (editorContainer) {
      editorView = new EditorView({
        state: createEditorState('print("Hello, World!")'),
        parent: editorContainer
      })
    }

    return (): void => editorView?.destroy()
  })
</script>

<div bind:this={editorContainer} id="editor"></div>

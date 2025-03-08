import { languageServer } from 'codemirror-languageserver'

export const luaLanguageClient = languageServer({
  serverUri: 'ws://localhost:3060',
  documentUri: 'untitled:Untitled',
  languageId: 'lua',
  workspaceFolders: null,
  rootUri: null
})

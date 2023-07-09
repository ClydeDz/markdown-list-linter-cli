#! /usr/bin/env node

import { lintMarkdownList } from 'markdown-list-linter'
import { Command } from 'commander'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json')

const program = new Command()

program
  .name('markdown-list-linter')
  .version(packageJson.version)
  .description(
    'CLI tool to lint markdown lists to warn when list items are not alphabetically ordered'
  )
  .option(
    '-f, --file  [value]',
    'path to the markdown file that needs to be linted'
  )
  .parse(process.argv)

const options = program.opts()

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

if (options.file) {
  const filepath = typeof options.file === 'string' ? options.file : __dirname
  const result = lintMarkdownList(filepath)
  // eslint-disable-next-line no-console
  console.log(result.formattedMessage)
}

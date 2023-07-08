#! /usr/bin/env node

import { lintMarkdownList } from "markdown-list-linter"
import { Command } from "commander"

const program = new Command()

program
  .name('markdown-list-linter')
  .version("0.0.7")
  .description("CLI tool to lint markdown lists to warn when list items are not alphabetically ordered")
  .option("-f, --file  [value]", "path to the markdown file that needs to be linted")
  .parse(process.argv)

const options = program.opts()

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

if (options.file) {
  const filepath = typeof options.file === "string" ? options.file : __dirname
  const result = lintMarkdownList(filepath)

  let outputBuilder = ''  
  outputBuilder += 'SUMMARY:\n' + result.summary + '\n'  
  result.errorObject ? outputBuilder += '\nDETAILS:\n' : undefined

  result.errorObject?.forEach(error => {
    outputBuilder += error.message + '\n'
    
    error.details.forEach((errorSections, index) => {      
      outputBuilder +=  '\tSection #' + (index + 1) + '\n'

      errorSections.forEach(errorItem => {
        outputBuilder +=  '\t\t' + errorItem + '\n'
      })

      outputBuilder += '\n'
    })
  })

  console.log(outputBuilder)
}

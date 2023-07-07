#! /usr/bin/env node

import { lintMarkdownList } from "markdown-list-linter";
import { Command } from "commander";

const program = new Command();

program
  .name('markdown-list-linter')
  .version("0.0.5")
  .description("CLI tool to lint markdown lists to warn when list items are not alphabetically ordered")
  .option("-f, --file  [value]", "path to the markdown file that needs to be linted")
  .parse(process.argv);

const options = program.opts();

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

if (options.file) {
  const filepath = typeof options.file === "string" ? options.file : __dirname;
  const result = lintMarkdownList(filepath)
  console.log('SUMMARY:')
  console.log(result.summary)
  console.log()
  result.errorObject ? console.log('DETAILS:') : undefined
  result.errorObject?.forEach(error => {
    console.log(error.message)
    error.details.forEach(errorSections => {      
      errorSections.forEach(errorItem => {
        console.log('\t' + errorItem)
      })
      console.log()
    })    
    console.log()
  })  
}

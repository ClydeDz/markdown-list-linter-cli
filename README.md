# Markdown List Linter

Command line interface (CLI) tool to lint markdown lists and warn when list items are not alphabetically ordered.

## A complete solution

This functionality is available to be consumed in three different ways:

- ⚡ [A GitHub Action](https://github.com/marketplace/actions/markdown-list-linter) as part of your CI/CD process

- 📦 [An NPM package](https://www.npmjs.com/package/markdown-list-linter) that can be consumed in your JavaScript or TypeScript code

- 💻 [A CLI](https://www.npmjs.com/package/markdown-list-linter-cli) that you can run in your terminal

## Installation

You can install this CLI tool globally.

```shell
npm install markdown-list-linter-cli -g
```

## Usage

Very simple to use all results will be printed in the terminal.

```ps
> markdown-list-linter -f ./data/valid_file.md
```

When there are no errors the returned object should look something like this.

```
SUMMARY:
No errors found
```

If you supply a markdown file which has a list that needs to be sorted.

```ps
> markdown-list-linter -f ./data/invalid_file.md
```

When there are errors the returned object should look something like this.

```
SUMMARY:
Markdown list needs to be sorted

DETAILS:
Please correct the alphabetical order for these heading items
    Section #1
        D
        A
        B
        C

Please correct the alphabetical order for these list items
    Section #1
        African Buffalo
        Aardwolf

    Section #2
        Chameleon
        Camel
        Cheetah
        Canary
```

The items in each section are the items in the list which need to be reordered.

For help command, type the following.

```ps
> markdown-list-linter -h
```

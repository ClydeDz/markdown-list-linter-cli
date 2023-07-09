import { prepareEnvironment } from '@gmrchk/cli-testing-library'

// https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
const SEMVER_REGEX =
  /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/
const MARKDOWN_LINT_CLI_TOOL = './lib/index.min.js'

let execute: any, cleanup: any

describe('markdown-list-linter CLI tool', () => {
  beforeEach(async () => {
    const cliTestingLibrary = await prepareEnvironment()
    execute = cliTestingLibrary.execute
    cleanup = cliTestingLibrary.cleanup
  })

  afterEach(async () => {
    await cleanup()
  })

  it('should display help text', async () => {
    const { code, stdout } = await execute(
      'node',
      `${MARKDOWN_LINT_CLI_TOOL} -h`
    )

    const helpText = [
      'Usage: markdown-list-linter [options]',
      'CLI tool to lint markdown lists to warn when list items are not alphabetically',
      'ordered',
      'Options:',
      '-V, --version        output the version number',
      '-f, --file  [value]  path to the markdown file that needs to be linted',
      '-h, --help           display help for command',
    ]

    expect(code).toBe(0)
    expect(stdout).toMatchObject(helpText)
  })

  it('should display version number', async () => {
    const { code, stdout } = await execute(
      'node',
      `${MARKDOWN_LINT_CLI_TOOL} -V`
    )

    expect(code).toBe(0)
    expect(stdout[0].toString().match(SEMVER_REGEX)).toBeTruthy()
  })

  it('should display no errors found when valid file is passed', async () => {
    const { code, stdout } = await execute(
      'node',
      `${MARKDOWN_LINT_CLI_TOOL} -f ./data/valid_file.md`
    )

    const expectedOutput = ['SUMMARY:', 'No errors found']

    expect(code).toBe(0)
    expect(stdout).toMatchObject(expectedOutput)
  })

  it('should display errors when file with unordered headings is passed', async () => {
    const { code, stdout } = await execute(
      'node',
      `${MARKDOWN_LINT_CLI_TOOL} -f ./data/unordered_headings.md`
    )

    const expectedOutput = [
      'SUMMARY:',
      'Markdown list needs to be sorted',
      'DETAILS:',
      'Please correct the alphabetical order for these heading items',
      'Section #1',
      'C',
      'Section #2',
      'D',
      'A',
    ]

    expect(code).toBe(0)
    expect(stdout).toMatchObject(expectedOutput)
  })

  it('should display errors when file with unordered list items is passed', async () => {
    const { code, stdout } = await execute(
      'node',
      `${MARKDOWN_LINT_CLI_TOOL} -f ./data/unordered_lists.md`
    )

    const expectedOutput = [
      'SUMMARY:',
      'Markdown list needs to be sorted',
      'DETAILS:',
      'Please correct the alphabetical order for these list items',
      'Section #1',
      `[African Buffalo]('https://www.AfricanBuffalo.com')`,
      `[Aardwolf]('https://www.Aardwolf.com')`,
      'Section #2',
      `[Chameleon]('https://www.Chameleon.com')`,
      `[Camel]('https://www.Camel.com')`,
      `[Cheetah]('https://www.Cheetah.com')`,
      `[Canary]('https://www.Canary.com')`,
    ]

    expect(code).toBe(0)
    expect(stdout).toMatchObject(expectedOutput)
  })

  it('should display errors when file with unordered headings and list items is passed', async () => {
    const { code, stdout } = await execute(
      'node',
      `${MARKDOWN_LINT_CLI_TOOL} -f ./data/unordered_lists_and_headings.md`
    )

    const expectedOutput = [
      'SUMMARY:',
      'Markdown list needs to be sorted',
      'DETAILS:',
      'Please correct the alphabetical order for these heading items',
      'Section #1',
      'D',
      'A',
      'B',
      'C',
      'Please correct the alphabetical order for these list items',
      'Section #1',
      'African Buffalo',
      'Aardwolf',
      'Section #2',
      'Chameleon',
      'Camel',
      'Cheetah',
      'Canary',
    ]

    expect(code).toBe(0)
    expect(stdout).toMatchObject(expectedOutput)
  })

  it('should display no errors found when valid file with no list is passed', async () => {
    const { code, stdout } = await execute(
      'node',
      `${MARKDOWN_LINT_CLI_TOOL} -f ./data/no_list.md`
    )

    const expectedOutput = ['SUMMARY:', 'No errors found']

    expect(code).toBe(0)
    expect(stdout).toMatchObject(expectedOutput)
  })

  it('should throw an error when non-existent file is passed', async () => {
    const { code, stderr } = await execute(
      'node',
      `${MARKDOWN_LINT_CLI_TOOL} -f ./data/this_file_does_not_exist.md`
    )

    expect(code).toBe(1)
    expect(JSON.stringify(stderr)).toContain(
      'Error: ENOENT: no such file or directory'
    )
  })
})

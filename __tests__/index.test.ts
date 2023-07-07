import { prepareEnvironment } from '@gmrchk/cli-testing-library';

// https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
const SEMVER_REGEX = /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/
const MARKDOWN_LINT_CLI_TOOL = './lib/index.min.js'

let execute: any, cleanup: any

describe("markdown-list-linter CLI tool", () => {
    beforeEach(async () => {
        const cliTestingLibrary = await prepareEnvironment();
        execute = cliTestingLibrary.execute
        cleanup = cliTestingLibrary.cleanup
    })

    afterEach(async () => {
        await cleanup();
    })

    it('should display help text', async () => {
        const { code, stdout } = await execute(
            'node',
            `${MARKDOWN_LINT_CLI_TOOL} -h`
        );

        const helpText = [
            'Usage: markdown-list-linter [options]',
            'Tbc',
            'Options:',
            '-V, --version        output the version number',
            '-f, --file  [value]  path to the markdown file that needs to be linted',
            '-h, --help           display help for command'
            ]
        
        expect(code).toBe(0);
        expect(stdout).toMatchObject(helpText)
    });

    it('should display version number', async () => {
        const { code, stdout } = await execute(
            'node',
            `${MARKDOWN_LINT_CLI_TOOL} -V`
        );
        
        expect(code).toBe(0);
        expect(stdout[0].toString().match(SEMVER_REGEX)).toBeTruthy()
    });

    it('should display no errors found when valid file is passed', async () => {
        const { code, stdout } = await execute(
            'node',
            `${MARKDOWN_LINT_CLI_TOOL} -f ./data/basic_pass.md`
        );

        const expectedOutput = [
            'SUMMARY:',
            'No errors found',
            ]
        
        expect(code).toBe(0);
        expect(stdout).toMatchObject(expectedOutput)
    });
});

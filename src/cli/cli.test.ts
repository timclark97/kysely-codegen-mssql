import { deepStrictEqual } from 'assert';
import { LogLevel } from '../core';
import { describe, it } from '../test.utils';
import type { CliOptions } from './cli';
import { Cli } from './cli';
import { DEFAULT_LOG_LEVEL, DEFAULT_OUT_FILE, DEFAULT_URL } from './constants';

export const testCli = () => {
  const cli = new Cli();

  const DEFAULT_CLI_OPTIONS: CliOptions = {
    camelCase: false,
    dialectName: undefined,
    domains: false,
    envFile: undefined,
    excludePattern: undefined,
    includePattern: undefined,
    logLevel: DEFAULT_LOG_LEVEL,
    outFile: DEFAULT_OUT_FILE,
    print: false,
    runtimeEnums: false,
    schema: undefined,
    typeOnlyImports: true,
    url: DEFAULT_URL,
    verify: false,
  };

  void describe('cli', () => {
    void it('should parse options correctly', () => {
      const assert = (args: string[], expectedOptions: Partial<CliOptions>) => {
        const cliOptions = cli.parseOptions(args, { silent: true });

        deepStrictEqual(cliOptions, {
          ...DEFAULT_CLI_OPTIONS,
          ...expectedOptions,
        });
      };

      assert(['--camel-case'], { camelCase: true });
      assert(['--dialect=mysql'], { dialectName: 'mysql' });
      assert(['--domains'], { domains: true });
      assert(['--no-domains'], { domains: false });
      assert(['--exclude-pattern=public._*'], { excludePattern: 'public._*' });
      assert(['--help'], {});
      assert(['-h'], {});
      assert(['--include-pattern=public._*'], { includePattern: 'public._*' });
      assert(['--log-level=debug'], { logLevel: LogLevel.DEBUG });
      assert(['--out-file=./db.ts'], { outFile: './db.ts' });
      assert(['--print'], { outFile: undefined, print: true });
      assert(['--type-only-imports'], { typeOnlyImports: true });
      assert(['--type-only-imports=true'], { typeOnlyImports: true });
      assert(['--type-only-imports=false'], { typeOnlyImports: false });
      assert(['--no-type-only-imports'], { typeOnlyImports: false });
      assert(['--url=postgres://u:p@s/d'], { url: 'postgres://u:p@s/d' });
      assert(['--schema=foo'], { schema: 'foo' });
      assert(['--verify'], { verify: true });
      assert(['--verify=true'], { verify: true });
      assert(['--verify=false'], { verify: false });
    });
  });
};

import { assertEquals, assert } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { describe, it, beforeEach, afterEach } from 'https://deno.land/std@0.224.0/testing/bdd.ts';

import results from './results.json' with { type: 'json' };

const folders = Deno.readDirSync('.');

for (const folder of [...folders].sort((a, b) => a.name.localeCompare(b.name))) {
  if (folder.isDirectory && !folder.name.startsWith('.')) {
    const year = folder.name as keyof typeof results;
    const files = Deno.readDirSync(year);

    describe(year, () => {
      beforeEach(() => Deno.chdir(year));
      afterEach(() => Deno.chdir('..'));

      for (const file of files) {
        if (file.isFile && file.name.endsWith('.ts')) {
          const day = file.name.split('.').shift()! as keyof typeof eventResults;

          const eventResults = results[year];
          it({
            name: `${year}/${file.name}`,
            ignore: !(year in results && day in results[year]),
            fn: async () => {
              const command = new Deno.Command('deno', {
                args: ['run', '--allow-read', file.name],
                stdout: 'piped',
                stderr: 'piped',
              });
              const { code, stdout } = await command.output();
              const output = new TextDecoder().decode(stdout);

              assert(code === 0);
              assertEquals(code, 0);

              if (eventResults[day].p1) {
                const p1 = output.match(/p1 (.*)/)?.pop()!;
                assertEquals(p1, String(eventResults[day].p1), `test ${year}/${file.name}`);
              }

              if (eventResults[day].p2) {
                const p2 = output.match(/p2 (.*)/)?.pop()!;
                assertEquals(p2, String(eventResults[day].p2));
              }
            },
          });
        }
      }
    });
  }
}

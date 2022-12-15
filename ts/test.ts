import { assertEquals, assert } from 'https://deno.land/std@0.168.0/testing/asserts.ts';
import { describe, it, beforeEach, afterEach } from 'https://deno.land/std@0.160.0/testing/bdd.ts';

import { exec, OutputMode } from 'https://deno.land/x/exec@0.0.5/mod.ts';
import results from './results.json' assert { type: 'json' };

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
              const response = await exec(`deno run --allow-read ${file.name}`, { output: OutputMode.Capture });
              assert(response.status.success);
              assertEquals(response.status.code, 0);
              const p1 = response.output.match(/p1 (.*)/)?.pop()!;
              const p2 = response.output.match(/p2 (.*)/)?.pop()!;
              assertEquals(p1, String(eventResults[day].p1));
              assertEquals(p2, String(eventResults[day].p2));
            },
          });
        }
      }
    });
  }
}

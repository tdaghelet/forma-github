const core = require('@actions/core');
const glob = require('@actions/glob');

async function run() {
  try {
    core.info('Search for missing package-lock.json files');

    const patterns = ['**/package.json', '!./node_modules/**'];
    const globber = await glob.create(patterns.join('\n'))
    for await (const file of globber.globGenerator()) {
      console.log(file)
      try {
        fs.accessSync(path.join(path.dirname(file), 'package-lock.json'));
      } catch (err) {
        core.warning(`Consider to generate it and commit it`, {
          file: file,
          title: 'Missing package-lock.json'
        });
      }
    }
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
const core = require('@actions/core');
const glob = require('@actions/glob');

async function run() {
  try {
    core.info('Search for missing package-lock.json files');

    const patterns = ['**/package.json', '!./node_modules/**'];
    const globber = await glob.create(patterns.join('\n'))
    for await (const file of globber.globGenerator()) {
      console.log(file)
    }
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
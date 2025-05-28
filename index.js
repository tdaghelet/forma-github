const core = require('@actions/core');
const glob = require('@actions/glob');
const path = require('path');
const fs = require('fs');

async function run() {
  try {
    const patterns = ['**/package.json', '!node_modules/**/package.json'];
    const globber = await glob.create(patterns.join('\n'));
    const files = await globber.glob();

    var analysedPackageJsonCount = 0;
    var missingPackageLockJsonCount = 0;
    files.forEach(file => {
      analysedPackageJsonCount++;
      try {
        fs.accessSync(path.join(path.dirname(file), 'package-lock.json'));
      } catch (err) {
        missingPackageLockJsonCount++;
        core.warning("Consider to generate it and commit it", {
          title: "Missing package-lock.json",
          file: file
        });
      }
    });

    core.summary.addHeading("Package.json analysis");
    if (analysedPackageJsonCount == 0){
      core.summary.addRaw("No package.json found");
    } else {
      if (missingPackageLockJsonCount == 0) {
        core.summary.addRaw(`No missing package-lock.json files based on ${analysedPackageJsonCount} package.json files analysed`);
      }
      else {
        core.summary.addRaw(`Missing ${missingPackageLockJsonCount} package-lock.json files based on ${analysedPackageJsonCount} package.json files analysed`);
      }
    }
    core.summary.write();
    
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
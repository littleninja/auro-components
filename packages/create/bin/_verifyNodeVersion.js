// Throw an error on unhandled rejections (exit non-zero)
process.on('unhandledRejection', err => {
    throw err;
  });
  
  // Can't write this using any fancy syntax because check must run on es5 and lower
  function verifySemver(minimum, current) {
    if (!minimum.length || !current.length) return false;
  
    const currentMajor = current[0];
    const currentMinor = current[1];
    const currentPatch = current[2];
  
    const minMajor = minimum[0];
    const minMinor = minimum[1];
    const minPatch = minimum[2];
  
    const majorValid = currentMajor >= minMajor;
    const minorValid = currentMajor > minMajor || currentMinor >= minMinor;
    const patchValid =
      currentMajor > minMajor ||
      currentMinor > minMinor ||
      currentPatch >= minPatch;
  
    return majorValid && minorValid && patchValid;
  }
  
  // Check Node Version (min: 10.16.0)
  const currentNodeVersion = process.versions.node;
  const minNodeVersion = [10, 16, 0];
  const nodeVersionIsValid = verifySemver(
    minNodeVersion,
    currentNodeVersion.split('.')
  );
  
  if (!nodeVersionIsValid) {
    const chalk = require('chalk');  
    console.log(
      chalk.red('Outdated Node version detected (' + currentNodeVersion + ').')
    );
    console.log(chalk.white('  Upgrade Node to at least ' + minNodeVersion.join('.')));
    process.exit(1);
  }
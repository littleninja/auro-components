// Throw an error on unhandled rejections (exit non-zero)
process.on("unhandledRejection", (err) => {
  throw err;
});

["SIGINT", "SIGTERM"].forEach(function (sig) {
  process.on(sig, function () {
    process.exit();
  });
});

require("./_verifyNodeVersion");

const fs = require("fs");
const fsPromises = fs.promises;
const exec = require("util").promisify(require("child_process").exec);
const arg = require("arg");
const chalk = require("chalk");
const path = require("path");
const inquirer = require("inquirer");
const paths = require("./_paths");

const lowerKebabCase = (str) => str.toLowerCase().replace(" ", "-");
const upperCamelCase = (str) =>
  lowerKebabCase(str)
    .split("-")
    .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
    .join("");

const parseArgs = () => {
  const args = arg({
    // Types
    "--help": Boolean,
    "--test": Boolean,
    "--version": Boolean,
    "--name": String,
    "--namespace": String,
    "--npm": String,
    "--dir": String,
    "--verbose": Boolean,
    // Aliases
    "-h": "--help",
    "-t": "--test",
    "-v": "--version",
    "-n": "--name",
    "-N": "--namespace",
    "-P": "--npm",
    "-d": "--dir",
  });

  if (args["--help"]) {
    console.log(require("./_help-outputs").generate);
    process.exit(0);
  }
  if (args["--version"]) {
    process.exit(0);
  }

  const test = args["--test"];
  const name = args["--name"] || "component";
  const npm = args["--npm"] || "@alaskaairux";
  const namespace = args["--namespace"] || "auro";
  const dir = path.resolve(
    args["--dir"] ||
      `./packages/${lowerKebabCase(namespace)}-${lowerKebabCase(name)}`
  );

  return {
    name,
    namespace,
    npm,
    test,
    dir,
    verbose: args["--verbose"],
  };
};

const makeFolder = async (dir) => {
  if (dir !== "." && !fs.existsSync(dir)) {
    await fsPromises.mkdir(dir);
  }
};

const formatTemplateFileContents = (content, { name, namespace, npm }) => {
  // name to lower-kebab-case (e.g. Text Input -> text-input)
  const lowerKebabCaseName = lowerKebabCase(name);
  // namespace to lower-kebab-case (e.g. Text Input -> text-input)
  const lowerKebabCaseNameSpace = lowerKebabCase(namespace);
  // name to UpperCamelCase (e.g. text-input -> TextInput)
  const upperCamelCaseName = upperCamelCase(name);
  // name to UpperCamelCase (e.g. text-input -> TextInput)
  const upperCamelCaseNameSpace = upperCamelCase(namespace);
  // gets git username from ./gitconfig
  const userName = require("git-user-name");
  // gets git email from ./gitconfig
  const userEmail = require("git-user-email");
  // generate new year for copyright stamp
  const newYear = new Date().getFullYear();

  const replacements = [
    { regex: /\[author\]/g, value: userName },
    { regex: /\[author-email\]/g, value: userEmail },
    { regex: /\[name\]/g, value: lowerKebabCaseName },
    { regex: /\[namespace\]/g, value: lowerKebabCaseNameSpace },
    { regex: /\[Namespace\]/g, value: upperCamelCaseNameSpace },
    { regex: /\[Name\]/g, value: upperCamelCaseName },
    { regex: /\[npm\]/g, value: npm },
    { regex: /\[year\]/g, value: newYear },
  ];

  // replace all instances of [name], [Name], [namespace] and [Namespace] accordingly
  let result = content;
  for (let i = 0; i < replacements.length; i++) {
    const { regex, value } = replacements[i];
    result = result.replace(regex, value);
  }
  return result;
};

const copyFile = async (sourcePath, targetPath, params, fileRenames = {}) => {
  const stats = await fsPromises.stat(sourcePath);
  if (stats.isDirectory()) {
    await makeFolder(targetPath);
    await copyAllFiles(sourcePath, targetPath, params, fileRenames);
  } else if (stats.isFile()) {
    const templateFileContents = await fsPromises.readFile(sourcePath, {
      encoding: "utf8",
    });
    const formattedTemplateFileContents = formatTemplateFileContents(
      templateFileContents,
      params
    );
    await fsPromises.writeFile(targetPath, formattedTemplateFileContents, {
      encoding: "utf8",
    });

    if (params.verbose) {
      console.log(`${chalk.green("Copied")}: ${sourcePath} -> ${targetPath}`);
    }
  }
};

const copyAllFiles = async (
  sourcePath,
  targetPath,
  params,
  fileRenames = {}
) => {
  const fileNames = await fsPromises.readdir(sourcePath);
  const fileCopyPromises = [];
  fileNames.forEach((fileName) => {
    console.log(
      `${chalk.bold("Creating")}: ${targetPath}/${
        fileRenames[fileName] || fileName
      }`
    );
    fileCopyPromises.push(
      copyFile(
        `${sourcePath}/${fileName}`,
        `${targetPath}/${fileRenames[fileName] || fileName}`,
        params,
        fileRenames
      )
    );
  });
  await Promise.all(fileCopyPromises);
};

const loadingLoop = (condition) => {
  if (condition()) return;
  process.stdout.write(" .");
  setTimeout(() => {
    loadingLoop(condition);
  }, 1000);
};

const question = async () => {
  const params = parseArgs();

  if (!params.test) {
    // todo: guidelines and prereqs for contributing would be more appropritate in CONTRIBUTING.md
    const questions = [
      {
        type: "confirm",
        name: "governance",
        message: "Did you review the Auro Governance Working Agreement?",
      },
      {
        type: "confirm",
        name: "status",
        message: "Have you reviewed the Auro Components status board?",
        when: function (answers) {
          return answers.governance;
        },
      },
      {
        type: "confirm",
        name: "status",
        message: "Have you reviewed the Auro Components status board?",
        when: function (answers) {
          return !readDocs("governance")(answers);
        },
      },
    ];

    function readDocs(arg) {
      return function (answers) {
        return answers[arg];
      };
    }

    // todo: guidelines and prereqs for contributing would be more appropritate in CONTRIBUTING.md
    inquirer.prompt(questions).then((answers) => {
      if (answers.status === false) {
        console.console.log(
          "Be sure to review https://auro.alaskaair.com/component-status before starting"
        );
      }

      if (answers.governance === false) {
        console.console.log(
          "Be sure to review https://auro.alaskaair.com/getting-started/developers/governance before starting"
        );
      }

      if (answers.governance === true && answers.status === true) {
        generateFromTemplate();
      }
    });
  } else {
    generateFromTemplate();
  }
};

const generateFromTemplate = async () => {
  const params = parseArgs();
  console.log(
    chalk.green(
      `
   _____ _         _          _____ _     _ _
  |  _  | |___ ___| |_ ___   |  _  |_|___| |_|___ ___ ___
  |     | | .'|_ -| '_| .'|  |     | |  _| | |   | -_|_ -|
  |__|__|_|__,|___|_,_|__,|  |__|__|_|_| |_|_|_|_|___|___|
   _ _ _ _____    _____                     _
  | | | |     |  |   __|___ ___ ___ ___ ___| |_ ___ ___
  | | | |   --|  |  |  | -_|   | -_|  _| .'|  _| . |  _|
  |_____|_____|  |_____|___|_|_|___|_| |__,|_| |___|_|
  Creating a Design System People Love.
      `
    )
  );

  await makeFolder(params.dir);
  await copyAllFiles(paths.self.template, params.dir, params, {
    "[namespace]-[name].test.js": `${lowerKebabCase(
      params.namespace
    )}-${lowerKebabCase(params.name)}.test.js`,
    "[namespace]-[name].js": `${lowerKebabCase(
      params.namespace
    )}-${lowerKebabCase(params.name)}.js`,
    "[namespace]-[name].module.scss": `${lowerKebabCase(
      params.namespace
    )}-${lowerKebabCase(params.name)}.module.scss`,
    "[namespace]-[name].stories.md": `${lowerKebabCase(
      params.namespace
    )}-${lowerKebabCase(params.name)}.stories.md`,
  });
  console.log(chalk.green("\nCopied all files!"));

  let areDependenciesInstalled = false;

  if (!params.test) {
    process.stdout.write(`\nInstalling dependencies`);
    loadingLoop(() => areDependenciesInstalled);
    try {
      await exec("npm i", { cwd: params.dir });
      console.log(chalk.green("\nSuccesfully installed dependencies!"));
    } catch ({ message }) {
      console.log(chalk.red(message));
    }
    areDependenciesInstalled = true;

    console.log(
      chalk.green(`Well done! The new HTML Custom Element ${params.namespace}-${params.name} has been created!
          \nDir: ${params.dir}
        \n`)
    );
  }
};

question();

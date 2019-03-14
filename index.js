#!/user/bin/env node

const commander = require("commander");
const fs = require("fs");
const download = require("download-git-repo");
const handlebars = require("handlebars");
const inquirer = require("inquirer");
const ora = require("ora");
const chalk = require("chalk");
const shell = require("shelljs");
const symbols = require("log-symbols");
const config = require("./package.json");

const repoUrls = {
  "taro-dva": "https://github.com:dylan-farm/taro-dva",
  "React-Redux-Router": "https://github.com:dylan-farm/React-Redux-Router",
  "django-vue": "https://github.com:dylan-farm/django-vue"
};
commander
  .version(config.version, "-v,--version")
  .command("init <name> [otherDirs...]")
  .action((name, otherDirs) => {
    if (!fs.existsSync(name)) {
      inquirer
        .prompt([
          {
            name: "description",
            message: "description"
          },
          {
            name: "author",
            message: "author"
          }
        ])
        .then(answers => {
          const spinner = ora({
            color: "green",
            text: "loading..."
          });
          spinner.start();
          const repoUrl = repoUrls[otherDirs[0] || "taro-dva"];
          download(repoUrl, name, { clone: true }, err => {
            if (err) {
              spinner.fail();
              console.log(symbols.error, chalk.red(err));
            } else {
              spinner.succeed();
              const fileName = `${name}/package.json`;
              const meta = {
                name,
                description: answers.description,
                author: answers.author
              };
              let f = fs.existsSync(fileName);
              const content = f ? fs.readFileSync(fileName).toString() : "";
              const result = handlebars.compile(content)(meta);
              fs.writeFileSync(fileName, result);
              console.log(symbols.success, chalk.green("finished"));
            }
          });
        });
    } else {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(symbols.error, chalk.red(`${name} already exists`));
    }
  });
commander.parse(process.argv);

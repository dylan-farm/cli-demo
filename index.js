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

commander
  .version("1.0.0", "-v,--version")
  .command("init <name>")
  .action(name => {
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
          download(
            "https://github.com:dylan-farm/taro-dva",
            name,
            { clone: true },
            err => {
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
            }
          );
        });
    } else {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(symbols.error, chalk.red(`${name} already exists`));
    }
  });
commander.parse(process.argv);

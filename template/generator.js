const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const resolve = (...file) => path.resolve(__dirname, ...file)
const { pageTemplate, componentTemplate } = require('./template.js')
const chalk = require('chalk')

const log = (message) => console.log(chalk.green(`${message}`))
const successLog = (message) => console.log(chalk.blue(`${message}`))
const errorLog = (error) => console.log(chalk.red(`${error}`))

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', (err) => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

async function create() {
  const { type } = await inquirer.prompt([
    {
      name: 'type',
      type: 'list',
      message: `You want to create:`,
      choices: [
        {
          name: 'Page',
          value: 'page',
        },
        {
          name: 'Component',
          value: 'component',
        },
      ],
    },
  ])

  const { name } = await inquirer.prompt([
    {
      type: 'input',
      message: `Please input the name of the ${type}:`,
      name: 'name',
      default: 'Unknown',
    },
  ])

  let template = ''
  if (type === 'page') {
    const layouts = []
    const layouts_folder = resolve('../src/layouts')
    const layouts_files = fs.readdirSync(layouts_folder)
    layouts_files.forEach(function (item) {
      const stat = fs.statSync(`${layouts_folder}/${item}`)
      if (!stat.isDirectory() && item.endsWith('.vue')) {
        layouts.push(item.substring(0, item.length - 4))
      }
    })
    const { layout_name } = await inquirer.prompt([
      {
        type: 'list',
        message: 'Please select a layout for the page',
        name: 'layout_name',
        default: 'Default',
        choices: layouts,
      },
    ])

    const { title } = await inquirer.prompt([
      {
        type: 'input',
        message: `Please input the title of the ${type}:`,
        name: 'title',
        default: name,
      },
    ])

    const { config } = await inquirer.prompt([
      {
        type: 'checkbox',
        message: 'Please config the page:',
        name: 'config',
        choices: [
          {
            name: 'hide in menu',
            value: 'hidenMenu',
          },
          {
            name: 'need require auth',
            value: 'requiresAuth',
          },
        ],
      },
    ])
    template = pageTemplate({
      name,
      layout_name,
      title,
      hidenMenu: config.includes('hidenMenu'),
      requiresAuth: config.includes('requiresAuth'),
    })
  } else {
    template = componentTemplate()
  }

  const file = resolve(type === 'page' ? '../src/pages' : '../src/components', `${name}.vue`)
  try {
    log(`正在生成 vue 文件......`)
    await generateFile(file, template)
    successLog('生成成功')
  } catch (e) {
    errorLog(e.message)
  }
}
create()

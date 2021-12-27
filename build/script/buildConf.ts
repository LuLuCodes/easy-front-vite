/**
 * Generate additional configuration files when used for packaging. The file can be configured with some global variables, so that it can be changed directly externally without repackaging
 */
import fs, { writeFileSync } from 'fs-extra'
import chalk from 'chalk'

import { getEnvConfig, getRootPath, getConfigFileName } from '../utils'

import pkg from '../../package.json'

interface CreateConfigParams {
  configName: string
  config: any
  configFileName?: string
}

function createConfig(params: CreateConfigParams) {
  const { configName, config, configFileName } = params
  try {
    const windowConf = `window.${configName}`
    // Ensure that the variable will not be modified
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '')
    fs.mkdirp(getRootPath('dist'))
    writeFileSync(getRootPath(`dist/${configFileName}`), configStr)

    console.log(chalk.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`)
    console.log(chalk.gray('dist' + '/' + chalk.green(configFileName)) + '\n')
  } catch (error) {
    console.log(chalk.red('configuration file configuration file failed to package:\n' + error))
  }
}

export function runBuildConfig() {
  const config = getEnvConfig()
  const configFileName = getConfigFileName(config)
  createConfig({ config, configName: configFileName, configFileName: '_app.config.js' })
}

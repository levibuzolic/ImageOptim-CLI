import execa = require('execa');
import { IOptions } from '.';
import { PNGQUANT_BIN_PATH, PNGQUANT_NUMBER_OF_COLORS } from './constants';

export const pngquant = async (pngFilePaths: string[], options: IOptions): Promise<void> => {
  const qualityOption = options.numberOfColors ? [] : [`--quality=${options.quality}`];

  try {
    await execa(PNGQUANT_BIN_PATH, [
      '--ext=.png',
      '--force',
      '--skip-if-larger',
      `--speed=${options.speed}`,
      ...qualityOption,
      options.numberOfColors || PNGQUANT_NUMBER_OF_COLORS,
      '--',
      ...pngFilePaths
    ]);
  } catch (err) {
    if (err.exitCode !== 99 && err.exitCode !== 98) {
      throw err;
    }
  }
};

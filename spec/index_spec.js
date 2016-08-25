import Directory from 'directory-helpers';
import register from 'test-inject';

async function gunzip(path) {
  return await this.exec('gzip', ['-dc', path]);
}

const inject = register({
  project: {
    setUp: () => new Directory('project'),
    tearDown: async (project) => await project.remove()
  }
});

describe('build-gzip', () => {
  it('acts during the compile stage', async () => {
    const directory = new Directory('.');
    const {stage} = await directory.read('package.json');
    expect(stage).toBe('compress');
  });

  it('gzips all files in the dist directory', inject(async ({project}) => {
    await project.write({
      'dist/file1': 'file1'.repeat(100),
      'dist/file2': 'file2'.repeat(100)
    });

    await project.execJs(`
      import { run } from 'esnext-async';
      import buildGzip from '../src';
      run(async () => {
        await buildGzip();
      });
    `);

    expect(await project::gunzip('dist/file1.gz')).toBe('file1'.repeat(100));
    expect(await project::gunzip('dist/file2.gz')).toBe('file2'.repeat(100));
  }));
});

export default [
  {
    input: 'src/cli.js',
    output: {
      file: 'bin/cli.js',
      format: 'cjs'
    },
    external: ['crypto']
  },
  {
    input: 'src/turn.js',
    output: [
      {
        file: 'dist/turn.js',
        sourcemap: true,
        exports: 'named',
        format: 'cjs'
      },
      {
        file: 'dist/turn.esm.js',
        sourcemap: true,
        format: 'esm'
      }
    ],
    external: ['crypto']
  }
]

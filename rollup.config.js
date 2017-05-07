import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/Forge.js',
    dest: 'index.js',
    plugins: [babel()],
    format: 'es'
}
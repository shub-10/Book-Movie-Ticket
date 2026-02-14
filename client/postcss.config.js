// postcss.config.js
export default {
  plugins: {
    'postcss-import': {}, // Handles @import statements
    'tailwindcss': {},    // Integrates Tailwind CSS (for v3 and earlier)
    'autoprefixer': {},   // Automatically adds vendor prefixes
    // Add other plugins as needed, e.g., 'cssnano' for minification
  },
};

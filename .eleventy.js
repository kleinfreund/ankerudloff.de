module.exports = function (eleventyConfig) {
  // Copies static files to output.
  eleventyConfig
    .addPassthroughCopy('img')
    .addPassthroughCopy('css')
    .addPassthroughCopy('js');

  return {
    htmlTemplateEngine: 'njk',
    templateFormats: [
      'md',
      'html',
      'njk'
    ],
    dir: {
      input: '.'
    }
  };
};

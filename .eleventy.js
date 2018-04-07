module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('js');

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
  }
};

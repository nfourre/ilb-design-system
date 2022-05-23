export function resolveScssPlugin() {
  return {
    name: 'resolve-scss-plugin',
    resolveMimeType(context) {
      if (context.path.endsWith('.scss')) {
        return 'js';
      }
    },

    async transform(context) {
      if (context.path.endsWith('.scss')) {
        const stylesheet = `
          const stylesheet = new CSSStyleSheet();
          stylesheet.replaceSync(${JSON.stringify(context.body)});
          export default stylesheet;
        `;
        return stylesheet;
      }
    },
  };
}
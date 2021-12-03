import { createAst, parseTypeScript } from './index.js'

export const handleChange = (input, viz, output) => {
  const ast = createAst(input);
  const result = parseTypeScript(ast);
  viz.update({ ast, selected: Object.keys(ast)[0] })
  output.innerHTML = result;
};

export default handleChange;

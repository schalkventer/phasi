export const html = (staticStrings = [], ...dynamic) => {
  const newStringsArray = (dynamic || []).map((singleDynamic, index) => {
    return `${staticStrings[index] || ""}${singleDynamic || ""}`;
  });

  const lastIndexStatic = staticStrings.length - 1;

  return `${newStringsArray.join("")}${staticStrings[lastIndexStatic]}`;
};

export default html;

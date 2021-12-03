export const createAst = (string) => {
  const descriptionArray = string.split('---')  

  const index = descriptionArray.length - 1
  const stringTarget = index > 0 && descriptionArray[index] !== '' ? descriptionArray[index] : descriptionArray[0]

  const array = stringTarget.split("\n");
  let lastPhase = "other";

  const result = array.reduce((result, text) => {
    const isPhase = /^[\s|\w]\w.+/gm.test(text);
    const trimmed = text.trim()
    const splitted = trimmed.split('//').map(val => val.trim())
    const key = splitted[1] ? splitted[0] : trimmed
    lastPhase = isPhase ? key : lastPhase;

    if (isPhase && splitted[1]) {
        return {
            ...result,
            [key]: {
                _: splitted[1]
            }
          };
    }

    if (isPhase) {
      return {
        ...result,
        [key]: {}
      };
    }

    const [event, comment] = trimmed.split('//')
    const trimmedComment = comment ? comment.trim() : null

    const [transition, target = null] = event
      .split(">>")
      .map((value) => value.trim())
      .filter(Boolean);

    if (!transition) return result;

    return {
      ...result,
      [lastPhase]: {
        ...result[lastPhase],
        [transition]: [target, trimmedComment]
      }
    };
  }, {});

  return result;
};

export default createAst;

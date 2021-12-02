const input = document.querySelector("[data-phasi-input]");
const output = document.querySelector("[data-phasi-output]");

const handleTab = (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const { value, selectionStart: start, selectionEnd: end } = event.target;
    event.target.value = `${value.substring(0, start)}  ${value.substring(
      end
    )}`;
  }
};

const createAst = (string) => {
  const array = string.split("\n");
  let lastPhase = "other";

  const result = array.reduce((result, text) => {
    const isPhase = /^[\s|\w]\w.+/gm.test(text);
    const trimmed = text.trim();

    lastPhase = isPhase ? trimmed : lastPhase;

    if (isPhase) {
      return {
        ...result,
        [trimmed]: {}
      };
    }

    const [transition, target = null] = trimmed
      .split(">")
      .map((value) => value.trim())
      .filter(Boolean);
    if (!transition) return result;

    return {
      ...result,
      [lastPhase]: {
        ...result[lastPhase],
        [transition]: target
      }
    };
  }, {});

  return result;
};

const START = `/*
 * Internal Phasi Logic
 */

const createPhase = <T extends object>(
   createActions: (innerSetKey: (newKey) => void
) => void): T  => {
   let key
   const setKey = (newKey) => { key = newKey }
   const map = createActions(setKey)
   if (key && !map[key]) throw new Error('The passed key does not match any predefined phase')

   const keys = Object.keys(map as any)

   const toggles = keys.reduce((result, innerKey) => ({
       ...result,
       [innerKey]: innerKey === key || keys[0],
   }), {})

   const phase = {
       ...toggles,
       actions: map[key || keys[0]],
   }

   return phase as T
}

/*
 * Schema
 */

`;

const INBETWEEN = `
/*
 * Actions
 */

const createActions = (setKey: (newKey: Exclude<keyof Phase, 'actions'>) => void) => (`;

const END = `)

const phase = createPhase(createActions)

`;

const parse = (ast) => {
  const phases = Object.keys(ast);

  const type = phases.map((key) => {
    const actionKeys = Object.keys(ast[key]);

    const toggles = phases.reduce((innerResult, innerKey) => {
      return {
        ...innerResult,
        [innerKey]: innerKey === key
      };
    }, {});

    const actions = actionKeys.reduce((result, key) => {
      return {
        ...result,
        [key]: "__REPLACE__"
      };
    }, {});

    return {
      ...toggles,
      actions
    };
  }, {});

  const before = JSON.stringify(type, null, 2)
    .replace(/"|'/gm, "")
    .replace(/__REPLACE__/gim, "Function")
    .replace(/^\[/, "type Phase = ")
    .replace(/,?\n\s\s{/gim, "\n | {")
    .replace(/^\s/gim, "   ")
    .replace(/]/, "")
    .replace(/\,/gim, ";")

  const innerActions = phases.reduce((result, key) => {
    const obj = ast[key];
    const keys = Object.keys(obj);

    return {
      ...result,
      [key]: keys.reduce((innerResult, innerKey) => {
        const transition = obj[innerKey];
        return {
          ...innerResult,
          [innerKey]: transition
            ? `____>${transition}____`
            : `____${innerKey}____`
        };
      }, {})
    };
  }, {});

  const after = JSON.stringify(innerActions, null, 2)
    .replace(/"/gmi, '')
    .replace(
      /____\w+____/gim,
      (value) => `() => console.log('${value.replace(/____/gim, "")}')`
    )
    .replace(
      /____>\w+____/gim,
      (value) => `() => setKey('${value.replace(/____>?/gim, "")}')`
    );

  return START + before + INBETWEEN + after + END;
};

const handleChange = (event) => {
  const ast = createAst(event.target.value);
  const result = parse(ast);
  output.innerText = result;
};

input.addEventListener("keydown", handleTab);
input.addEventListener("input", handleChange);

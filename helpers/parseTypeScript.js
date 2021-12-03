

const START = `/*
 * Phasi Logic 
 *
 * Works with vanilla TypeScript, however if 
 * using React then simply pass a "setPhase" 
 * for a useState phase string.
 */

const createPhase = &lt;T extends object&gt;(
  createEvents: (innerSetKey: (newKey) =&gt; void
) =&gt; void): T  =&gt; {
  let key
  const setKey = (newKey) =&gt; { key = newKey }
  const map = createEvents(setKey)
  if (key &amp;&amp; !map[key]) throw new Error('The passed key does not match any predefined phase')

  const keys = Object.keys(map as any)

  const toggles = keys.reduce((result, innerKey) =&gt; ({
      ...result,
      [innerKey]: innerKey === key || keys[0],
  }), {})

  const phase = {
      ...toggles,
      events: map[key || keys[0]],
  }

  return phase as T
}

/*
 * Schema
 */

`;

const INBETWEEN = `
  
/*
 * Events
 */

const createEvents = (setKey: (newKey: Exclude&lt;keyof Phase, 'eventss'&gt;) =&gt; void) =&gt; (`;

const END = `)

const phase = createPhase(createEvents)

/*
 * To determine the type, simply check whether 
 * the property with same name is true, for example: 
 *
 * if (phase.butterfly) {
 *  console.log('🦋')
 * }
 * 
 * In order for TypeScript to know what events are 
 * available you might need to narrow the Phase type, for example:
 * 
 * const next = () => {
 *    if (phase.egg) return phase.event.hatch()
 *    if (phase.caterpillar) return phase.event.cocoon()
 *    if (phase.butterfly) return phase.event.mate()
 * }
 * 
 * next() // 'caterpillar'
 * next() // 'butterfly
 * next() // 'egg'
 *
 */

`;

export const parseTypeScript = (ast) => {
 const phases = Object.keys(ast);

 const type = phases.reduce((result, key) => {
   const eventKeys = Object.keys(ast[key]).filter(val => val !== '_');;

   const toggles = phases.reduce((innerResult, innerKey) => {
     return {
       ...innerResult,
       [innerKey]: innerKey === key
     };
   }, {});

   const event = eventKeys.reduce((innerResult, key) => {
     return {
       ...innerResult,
       [key]: "__REPLACE__"
     };
   }, {});

   return {
     ...result,
     [`interface ${key[0].toUpperCase()}${key.slice(1)}`]: {
      ...toggles,
      event
     }
   };
 }, {});


  const beforeMap = JSON
  .stringify(type, null, 2)
  .replace(/"/gmi, '').replace(/^\s\s/gmi, '').replace(/(?<=interface.+)\:/gmi, '')
  .replace(/^},/gmi, '}\n')
  .replace(/^}\n}/gmi, '}\n')
  .replace(/,/gmi, '')
  .replace(/^{/, '')
  .replace(/^}$/, '')
  .replace(/__REPLACE__/gim, "Function")

 const innerEvents = phases.reduce((result, key) => {
   const obj = ast[key];
   const keys = Object.keys(obj).filter(val => val !== '_');

   return {
     ...result,
     [key]: keys.reduce((innerResult, innerKey) => {
      const [destination] = obj[innerKey];

       return {
         ...innerResult,
         [innerKey]: destination
           ? `____>${destination}____`
           : `____${innerKey}____`
       };
     }, {})
   };
 }, {});


 
 const before = `${beforeMap}

 type Phase = ${phases.map(value => value[0].toUpperCase() + value.slice(1)).join(' | ')}
`

 const after = JSON.stringify(innerEvents, null, 2)
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

export default parseTypeScript
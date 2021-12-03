# 🐛 Phasi

**Converts a custom string notation into a plug-and-play TypeScript finite state machine.**


Input:

```
egg
  grow
  hatch > caterpillar

caterpillar
  eat
  crawl
  cocoon > butterfly

butterfly
  fly
  mate > egg
```

Output: 

```ts
/*
 * Internal Phasi Logic
 */

const createPhase = (
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

type Phase = 
   | {
      egg: true;
      caterpillar: false;
      butterfly: false;
      actions: {
        grow: Function;
        hatch: Function
      }
    }
   | {
      egg: false;
      caterpillar: true;
      butterfly: false;
      actions: {
        eat: Function;
        crawl: Function;
        cocoon: Function
      }
    }
   | {
      egg: false;
      caterpillar: false;
      butterfly: true;
      actions: {
        fly: Function;
        mate: Function
      }
    }

/*
 * Actions
 */

const createActions = (setKey: (newKey: Exclude) => void) => ({
  egg: {
    grow: () => console.log('grow'),
    hatch: () => setKey('caterpillar')
  },
  caterpillar: {
    eat: () => console.log('eat'),
    crawl: () => console.log('crawl'),
    cocoon: () => setKey('butterfly')
  },
  butterfly: {
    fly: () => console.log('fly'),
    mate: () => setKey('egg')
  }
})

const phase = createPhase(createActions)

const evolve = () => {
  if (phase.egg) return phase.actions.hatch()
  if (phase.caterpillar) return phase.actions.cocoon()
  if (phase.butterfly) return phase.actions.mate()

  throw new Error('Unable to evolve')
}

evolve();
console.log(phase.caterpillar) // true

evolve();
console.log(phase.butterfly) // true
console.log(phase.egg) // false

evolve();
console.log(phase.egg) // false
```

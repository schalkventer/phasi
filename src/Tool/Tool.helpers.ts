import * as types from './Tool.types'

const removeComments = (array: string[]) => {
  let isComment = false

  return array.map((line) => {
    if (line.startsWith('***')) {
      isComment = !isComment
      return null
    }
    if (isComment) return null
    return line
  })
}

const fetchMachines = (array: string[]): Record<string, string[]> => {
  let nameRecord = false
  let machineName = ''
  let machines: Record<string, string[]> = {}

  array.forEach((line) => {
    if (line.startsWith('---')) {
      nameRecord = !nameRecord
      return
    }

    if (nameRecord) {
      machineName = line.trim()
      return
    }

    if (!machineName) return
    const existingArray: string[] = machines[machineName] || []

    machines = {
      ...machines,
      [machineName]: [...existingArray, line],
    }
  })

  return machines
}

const parseMachineNotation = (array: string[]) => {
  let currentPhase = ''

  return array.reduce((result: types.Machine, line) => {
    if (line.trim() === '') return result

    if (/^\w/.test(line)) {
      const [phase, note] = line.split('//').map((val) => val.trim())

      currentPhase = phase

      return {
        ...result,
        [phase]: {
          note,
        },
      } as types.Machine
    }

    if (/^\s/.test(line) && /\|\|/.test(line)) {
      const nestedMachine = line.replace(/[\s||]/g, '')

      const existingNestedMachines = (result[currentPhase] && result[currentPhase].nestedMachines) || []

      return {
        ...result,
        [currentPhase]: {
          ...result[currentPhase],
          nestedMachines: [...existingNestedMachines, nestedMachine],
        },
      } as types.Machine
    }

    if (/^\s/.test(line)) {
      const isTransition = />>/.test(line)

      if (isTransition) {
        const [event, remaining] = line.split('>>').map((val) => val.trim())

        const [transition, note = null] = remaining.split('//').map((val) => val.trim())

        return {
          ...result,
          [currentPhase]: {
            ...result[currentPhase],
            events: {
              ...(!result[currentPhase] ? {} : result[currentPhase].events),
              [event]: {
                note,
                transition,
              },
            },
          },
        } as types.Machine
      }

      const [event, note] = line.split('//').map((val) => val.trim())

      return {
        ...result,
        [currentPhase]: {
          ...result[currentPhase],
          events: {
            ...(!result[currentPhase] ? {} : result[currentPhase].events),
            [event]: {
              note,
            },
          },
        },
      } as types.Machine
    }

    return result
  }, {} as types.Machine)
}

const addPhasesToMachines = (object: Record<string, string[]>) => {
  const keys = Object.keys(object)

  const result = keys.reduce((result, singleKey) => {
    return {
      ...result,
      [singleKey]: parseMachineNotation(object[singleKey]),
    }
  }, {})

  return result
}

export const createAst = (string: string): types.Ast => {
  const linesArray = string.split('\n')
  const noEmptyLines = linesArray.filter(Boolean)
  const removedComments = removeComments(noEmptyLines).filter(Boolean) as string[]
  const machines = fetchMachines(removedComments)
  const machinesWithPhases = addPhasesToMachines(machines)
  return machinesWithPhases
}

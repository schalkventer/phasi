import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from './Tool.Link'
import { Item } from './Tool.Item'
import * as types from './Tool.types'

export const Column = styled.div`
  max-width: 500px;
  width: 100%;
  min-width: 250px;
  overflow-y: scroll;
  height: 95vh;
  padding-bottom: 20rem;
`

export const ItemWrap = styled.div`
  padding: 0.25rem;
`

const Nested = styled.div<{ status: types.status }>`
  border: 2px solid ${(props) => (props.status === 'selected' ? '#de3c4b' : '#ccc')};
  border-radius: 4px;
  display: inline-block;
  padding: 0.5rem;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
`

const Title = styled.div<{ status?: types.status }>`
  font-weight: 900;
  font-size: 16px;
  line-height: 1;
  color: ${(props) => (props.status === 'selected' ? '#a11826' : 'black')};
  text-decoration: none;
`

export const Machine = (props: types.MachineProps) => {
  const { machineObj, onNested } = props

  const [selected, setSelected] = useState<string>(Object.keys(machineObj)[0])
  const [upcoming, setUpcoming] = useState<null | string>(null)

  useEffect(() => {
    const { nestedMachines } = machineObj[selected] || {}
    onNested(nestedMachines || [])
    // eslint-disable-next-line
  }, [selected])

  const createEventsArray = (eventsObj: Record<string, types.Event>, status: types.status) =>
    Object.keys(eventsObj).map((singleEventName) => {
      const { note = null, transition = null } = eventsObj ? eventsObj[singleEventName] : {}

      const handleSelected = () => (transition ? setSelected(transition) : undefined)
      const handleUpcoming = () => (transition ? setUpcoming(transition) : undefined)
      const handleClear = () => (transition ? setUpcoming(null) : undefined)

      return (
        <div key={singleEventName}  onClick={handleSelected} onMouseEnter={handleUpcoming} onMouseLeave={handleClear}>
          <Link action={singleEventName} destination={transition} status={status} note={note} />
        </div>
      )
    })

  const result = Object.keys(machineObj).map((singlePhaseName) => {
    const { nestedMachines = [], note, events } = machineObj[singlePhaseName]

    const upcomingStatus = upcoming === singlePhaseName ? 'upcoming' : 'inactive'
    const selectedStatus = selected === singlePhaseName ? 'selected' : upcomingStatus
    const eventsArray = events ? createEventsArray(events, selectedStatus) : null

    return (
      <ItemWrap>
        <Item key={singlePhaseName} name={singlePhaseName} status={selectedStatus} note={note || null}>
          <>
            {nestedMachines.map((name) => (
              <Nested status={selectedStatus}>
                <Title as='a' href={`#machine-${name}`} status={selectedStatus}>
                  {name}
                </Title>
              </Nested>
            ))}

            {eventsArray}
          </>
        </Item>
      </ItemWrap>
    )
  })

  return (
    <>
      {result}
    </>
  )
}

export default Machine

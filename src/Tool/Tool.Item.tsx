import React from 'react'
import styled from 'styled-components'
import * as types from './Tool.types'

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 1;
  padding-bottom: 0.25rem;
`

const MAP_ACTIVE_STYLES: Record<types.status, Record<'border' | 'background', string>> = {
  inactive: {
    border: '#CCC',
    background: 'white',
  },
  selected: {
    border: '#de3c4b',
    background: '#de3c4b10',
  },
  upcoming: {
    border: '#000000',
    background: 'white',
  },
} as const

const StateBase = styled.div<{ status: types.status }>`
  vertical-align: top;
  border: 2px solid ${(props) => MAP_ACTIVE_STYLES[props.status].border};
  background: ${(props) => MAP_ACTIVE_STYLES[props.status].background};
  color: #222222;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`

const Actions = styled.div`
  padding-top: 1rem;
`

const Note = styled.div`
  font-size: 13px;
  font-family: Roboto, sans-serif;
  letter-spacing: 0.25px;
  max-width: 15rem;
  font-weight: bold;
  line-height: 1.25;
  margin-top: 1rem;
  color: #333;
`

export const Item = (props: types.StateProps) => {
  const { name, children, status, note } = props

  return (
    <StateBase status={status}>
      <Title>{name}</Title>
      {note && <Note>{note}</Note>}
      <Actions>{children}</Actions>
    </StateBase>
  )
}

export default Item

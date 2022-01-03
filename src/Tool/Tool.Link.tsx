import React from 'react'
import styled from 'styled-components'
import * as types from './Tool.types'

const Arrow = styled.div`
  font-size: 18px;
  padding: 0 0.25rem;
`

const LinkBase = styled.div`
  display: flex;
  align-items: center;
`

const Note = styled.div`
  font-size: 11px;
  opacity: 0.75;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  letter-spacing: 0.25px;
  max-width: 15rem;
  margin: 0.25rem 0 0.75rem 0.5rem;
`

const Action = styled.button<{ status: types.status; note: string | null }>`
  border-width: 0;
  margin: 0.1rem 0;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  cursor: ${(props) => (props.status === 'selected' ? 'pointer' : 'not-allowed')};
  background: ${(props) => (props.status === 'selected' ? '#de3c4b' : '#EEE')};
  color: ${(props) => (props.status === 'selected' ? 'white' : 'black')};

  &:hover {
    background: ${(props) => (props.status === 'selected' ? '#ad1927' : '#EEE')};
  }

  &:active {
    background: ${(props) => (props.status === 'selected' ? '#9b0614' : '#EEE')};
  }
`

const Text = styled.button`
  background: none;
  border-width: 0;
  white-space: nowrap;
`

export const Link = (props: types.LinkProps) => {
  const { action, destination, status, note } = props

  if (!destination) {
    return (
      <>
        <LinkBase>
          <Action note={note} status={status}>
            {action}
          </Action>
        </LinkBase>

        {note && <Note>{note}</Note>}
      </>
    )
  }

  return (
    <>
      <LinkBase>
        <Action status={status} note={note}>
          {action}
        </Action>

        <Arrow>➞</Arrow>

        <Text>{destination}</Text>
      </LinkBase>

      {note && <Note>{note}</Note>}
    </>
  )
}

export default Link

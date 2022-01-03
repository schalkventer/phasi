import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useLocalStorage } from "react-use";

import { createAst } from "./Tool.helpers";
import { Machine } from "./Tool.Machine";
import * as types from "./Tool.types";

const FloatingLink = styled.a`
  position: fixed;
  bottom: 1.5rem;
  left: 0.5rem;
  background: #de3c4b;
  color: white;
  font-weight: bold;
  height: 2rem;
  font-size: 0.9rem;
  width: 7rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #ad1927;
  }
`


const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  overflow-x: scroll;
`;

const Column = styled.div<{ closed?: boolean }>`
  border-right: 1px solid grey;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.closed ? "50px" : "300px")};
  flex-grow: 1;
  height: 100%;
`;

const InputWrap = styled.div<{ closed?: boolean }>`
  height: 100%;
  width: ${(props) => (props.closed ? "50px" : "100%")};
  border-right: 1px solid grey;
`;

const Title = styled.div<{ closed?: boolean }>`
  padding: 1rem;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  transform-origin: 0% 100%;
  transform: translateY(${(props) => (props.closed ? "-52px" : "0")})
    rotate(${(props) => (props.closed ? 90 : 0)}deg);
  width: ${(props) => (props.closed ? "100vh" : "100%")};
  will-change: contents;
  border-bottom: 1px solid grey;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const Input = styled.textarea<{ closed?: boolean }>`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding: 1rem;
  overflow-y: scroll;
  background: #222222;
  color: white;
  font-size: 1.25rem;
  display: ${(props) => (props.closed ? "none" : "block")};
`;

const Content = styled.div<{ closed?: boolean }>`
  overflow-y: scroll;
  display: ${(props) => (props.closed ? "none" : "block")};
  max-width: 50rem;
  width: 100%;
  height: 100%;
`;

const ColumnWrap = styled.div`
  height: 100%;
`;

const VALUE_FALLBACK = `
***

🥚🐛🦋

Welcome to Phasi! See Instructions below:

create comment: "***" above and below
create machine: "---" above and below name

defines phase: a word with no indent
defines event: a new line with at least two spaces indent

event transitions to another phase: ">>"
note about phase or event: "//"

***

---
lineage
---

active // asdasd
  || organism
  die >> extinct // asdasd

extinct // asdasd

---
organism
---

egg
  grow
  hatch >> caterpillar // first event

caterpillar // has 12 eyes
  eat // goes munch munch
  crawl // goes squish squish
  cocoon >> butterfly

butterfly
  fly // butterfly goes brrrrr
  mate >> egg`;

const flattenActiveMachines = (
  activeMachines: Record<string, string[]>
): string[] => {
  let result: string[] = [];

  const machineKeysList = Object.keys(activeMachines);

  machineKeysList.forEach((machineKey: string) => {
    activeMachines[machineKey].forEach((activeKey) => {
      if (result.includes(activeKey)) return;
      result.push(activeKey);
    });
  });

  return result;
};

export const Tool = () => {
  const [ref, setRef] = useState<null | any>(null);
  const [ast, setAst] = useState<types.Ast>({});
  const [value, setValue] = useLocalStorage("1639819237", VALUE_FALLBACK);

  const [activeMachines, setActiveMachines] = useState<
    Record<string, string[]>
  >({});

  const flatActiveMachines = flattenActiveMachines(activeMachines);

  const [hidden, setHidden] = useState<Record<string, boolean>>({
    notation: false,
  });

  useEffect(() => {
    setHidden(
      Object.keys(ast).reduce(
        (result, machineKey) => ({
          ...result,
          [machineKey]: true,
        }),
        { notation: false }
      )
    );
  }, [ast]);

  const handleInputRef = (newRef: HTMLTextAreaElement) => {
    if (!newRef || ref) return;
    setRef(newRef);
  };

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
      setAst(createAst(event.target.value));
    },
    [setValue]
  );

  useEffect(() => {
    if (!ref) return;
    setAst(createAst(ref.value));

    ref.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const target = event.target as HTMLTextAreaElement;

        if (!event.target) throw new Error("No Target");
        const { value, selectionStart: start, selectionEnd: end } = target;
        target.value = `${value.substring(0, start)}  ${value.substring(end)}`;
      }
    });
  }, [ref]);

  const handleNested = (key: string, array: string[]) => {
    setActiveMachines({
      ...activeMachines,
      [key]: array,
    });
  };

  return (
    <>
    <Wrapper>
      <InputWrap closed={hidden.notation}>
        <Title
          closed={hidden.notation}
          onClick={() => setHidden({ ...hidden, notation: !hidden.notation })}
        >
          Notation
        </Title>
        <Input
          closed={hidden.notation}
          defaultValue={value}
          ref={handleInputRef}
          onChange={handleChange}
        />
      </InputWrap>
      {Object.keys(ast).map((machineName, index) => {
        if (index !== 0 && !flatActiveMachines.includes(machineName))
          return null;

        return (
          <ColumnWrap>
            <Column closed={hidden[machineName]}>
              <Title
                closed={hidden[machineName]}
                onClick={() =>
                  setHidden({
                    ...hidden,
                    [machineName]: !hidden[machineName],
                  })
                }
              >
                {machineName}
              </Title>
              <Content closed={hidden[machineName]}>
                <Machine
                  key={machineName}
                  machineObj={ast[machineName]}
                  onNested={(array) => handleNested(machineName, array)}
                />
              </Content>
            </Column>
          </ColumnWrap>
        );
      })}
    </Wrapper>

      <FloatingLink href="https://github.com/schalkventer/phasi#readme" target="_blank">
        What is Phasi?
      </FloatingLink>
    </>
  );
};

export default Tool;

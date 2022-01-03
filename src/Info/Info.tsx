import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  width: 50%;
  text-align: left;
`;

const Title = styled.div`
  font-size: 8rem;
  font-weight: 900;
  letter-spacing: -5px;
  font-style: italic;
  margin: 0;
  line-height: 0.9;
  color: #de3c4b;
`;

const Right = styled.div`
  width: 50%;
  padding: 1rem;
  text-align: right;
`;

const Emoji = styled.div`
  font-size: 4rem;
  line-height: 1;
  margin: 0;
  padding-bottom: 0.5rem;
`;

const Version = styled.p`
  background: #de3c4b25;
  border-radius: 50px;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  color: #de3c4b;
  line-height: 1;
`;

const Maintainer = styled.p`
  font-weight: 600;
  padding: 0;
  margin: 0;
  color: #2c292d;
  font-size: 0.9rem;
  line-height: 1;
  letter-spacing: -0.1px;
  padding-bottom: 1rem;
`;

const Link = styled.a`
  color: #2c292d;
`;

const Heading = styled.h2`
  font-size: 2rem;
  letter-spacing: -1px;
  margin: 0;
  line-height: 0.9;
  font-weight: 800;
  color: #2c292d;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid grey;
`;

const Content = styled.main`
  max-width: 600px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Paragraph = styled.p`
  color: #2c292d;
`;

const Item = styled.li`
  color: #2c292d;
`;

const Example = styled.pre`
  background: #eee;
  font-family: monospace;
  padding: 1.5rem 4rem 2.5rem 2rem;
  border-radius: 4px;
  margin-right: 4rem;
`;

const Code = styled.code`
  background: #eee;
  font-family: monospace;
`;

const example = `
---
Organism
---

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
`;

export const Info = () => {
  return (
    <Wrap>
      <Header>
        <Left>
          <Title>Phasi</Title>
        </Left>
        <Right>
          <Emoji>🥚 🐛 🦋</Emoji>
          <Version>Alpha 0.3</Version>

          <Maintainer>
            <span>Maintained by </span>
            <Link target="_blank" href="https://schalkventer.me">
              Schalk Venter
            </Link>
          </Maintainer>

          <div>
            <a href="https://github.com/schalkventer/phasi">
              <img
                alt=""
                src="https://img.shields.io/github/stars/schalkventer/phasi?style=social"
              />
            </a>
          </div>
        </Right>
      </Header>

      <main>
        <Row>
          <Content>
            <Heading>What is Phasi?</Heading>

            <Paragraph>
              <strong>
                In short, Phasi is a way to describe the different phases
                something can be in and the actions that can be performed in
                these phases.
              </strong>
            </Paragraph>

            <Paragraph>
              For example, the text snippet next to this paragraph indicates how
              one would describe the different phases that an butterfly goes
              through during its life. The following characters are used to
              communicate the relationship between the phases:
            </Paragraph>

            <ul>
              <Item>
                <Code> --- </Code> is used to above and below a single word to
                indicate the name of the thing being described
              </Item>
            </ul>
          </Content>

          <div>
            <Example>{example}</Example>
          </div>
        </Row>
      </main>
    </Wrap>
  );
};

export default Info;

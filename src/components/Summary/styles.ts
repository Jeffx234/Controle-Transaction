import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1120px;
  margin-top: -10rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 720px) and (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }

  div {
    background: #2d3748;

    padding: 2.5rem 2rem;
    border-radius: 0.25rem;
    color: ${(props) => props.theme.colors.quaternary};

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    &.highligth-background {
      background: #2c5282;
      color: #fff;
    }
  }
`

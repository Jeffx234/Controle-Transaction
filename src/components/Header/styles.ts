import styled from 'styled-components'

export const Container = styled.header`
  background: rgba(25, 25, 25);

  h3 {
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 100%;
    padding: 0 1rem;
    padding-top: 2rem;
  }
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Flex = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 80px;
  }

  h2 {
    color: #fff;
    font-size: 2rem;
  }
`

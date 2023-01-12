import styled from 'styled-components'

export const Container = styled.div`
  background: #000;
  display: flex;
  padding: 16px;
  height: 100vh;
  gap: 16px;
`
export const ContainerSidebar = styled.aside`
  background: gray;
  height: 100vh;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
`

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  padding: 12px 32px;

  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 999;
  border-radius: 4px;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease-in-out;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      background: gray;
      padding: 10px;
      color: #fff;
      margin: 10px;
      border-radius: 4px;
      transition: all 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        background: #f1f1f1;
        color: #000;
      }
    }
  }
`

export const ContainerMain = styled.main`
  flex: 1;
  min-height: 100vh;
`

export const Avatar = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;

  img {
    width: 100%;
    max-width: 60px;
    border-radius: 50%;
  }

  button {
    background: transparent;
    border: 0;
    display: flex;
    align-items: center;
    margin-left: 16px;
    background: red;
    border-radius: 50%;
    padding: 4px;
  }
`

export const Footer = styled.footer`
  margin-top: auto;
  display: flex;
  align-items: center;
  padding: 16px;
  background: #fff;
`

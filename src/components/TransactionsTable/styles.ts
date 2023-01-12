import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 4rem;

  button {
    background: transparent;
    border: 0;
    transition: filter 0.5s;

    &:hover {
      background: white;
      filter: brightness(0.9);
    }
  }

  table {
    border-collapse: separate;
    width: 100%;
    border-spacing: 0 0.5rem;

    .buttons {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      button {
        background: transparent;
        border: 0;
      }
    }

    thead {
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;

      td {
        color: #969cb3;
        background: #212121;
      }
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: #212121;
      color: white;
      border-radius: 0.25rem;

      &:first-child {
        color: white;
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }
    }
  }
`

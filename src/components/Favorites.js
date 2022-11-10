import styled from "styled-components";

export const StyledFavorites = styled.div`
  .favorite-avatar {
    margin-top: 5px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 0px 0px 5px black;
  }
  h2 {
    font-size: 16px;
    margin: 0px 0px 16px 32px;
    text-transform: capitalize;
  }
  section {
    width: calc(100vw - 16px * 4);
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    margin-left: 32px;
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      scroll-snap-align: start;
      margin: 0px 10px;
      span {
        padding-top: 8px;
        display: block;
        color: ${({ theme }) => theme.textColorBase || "#222222"};
      }
    }
  }
`;

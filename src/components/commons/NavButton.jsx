import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react';
import styled, { css } from 'styled-components';
import { useState } from 'react';

const NavStyleButton = styled.button`
  background-color: #0c6fcd;
  border: 1px solid #0c6fcd;
  border-radius: 3px;
  color: #cd0c22;
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    background: cornflowerblue;
    color: white;
    transition: 0.2s;
  }
`;

function NavButton({ children }) {
  const [buttonClick, setButtonClick] = useState(false);
  const onclick = (e) => {
    e.preventDefault();
    setButtonClick(true);
  };
  return (
    <form>
      <NavStyleButton type="submit" onClick={onclick} buttonClick={buttonClick}>
        {children}
      </NavStyleButton>
    </form>
  );
}

export default NavButton;

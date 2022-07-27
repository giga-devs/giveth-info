import styled from 'styled-components';

export const styles = {
  control: (provided) => ({
    ...provided,
    color: '#ffff',
    border: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#ffff',
    border: 0,
  }),
  container: (provided) => ({
    ...provided,
    width: 350,
    fontFamily: 'Red Hat Text',
    textAlign: 'center',
  }),
  menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
};

export const SelectContainer = styled.div`
  display: flex;
`;

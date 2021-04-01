import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`

  ${normalize}

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    
  }
  
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    font-family: 'Poppins', sans-serif;
    background-color: #2f3f59;
    color: #fff;
    
  }
  
  h1, h2, h3, h4, h5, span {
    margin: 0;
  }
  
  button {
    padding: 0;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    color: #fff;
  }
  
  ul {
    padding: 0;
    margin: 0;
  }
`;

export default GlobalStyle;

import styled from 'styled-components';

const AppStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgb(200, 255, 100);
    display: flex;
    place-content: center;
    place-items: center;
`;

const Main = styled.div`
    font-size: 60vh;
    font-weight: 600;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    transition: all .5s ease-in-out;
    transform-origin: 32.22% 22%;
    transform: scale( ${p => p.scale} );
`;

export { Main };
export default AppStyle;
import styled from 'styled-components';

const AppStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background: ${p => p.color};
    display: flex;
    place-content: center;
    place-items: center;
`;

const Main = styled.div`
    font-size: 50vh;
    font-weight: 600;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    transition: all ${p => p.scale < 5 ? '.35' : '1'}s linear;
    transform-origin: ${p => p.pivotX}% ${p => p.pivotY}%;
    transform: scale(${p => p.scale});
`;

const MainTitle = styled.div`
    transform-origin: 50% 50%;
    transform: 
        rotateX( ${p => p.rotateX}deg ) 
        rotateY( ${p => p.rotateY}deg );
`;

export { Main, MainTitle };
export default AppStyle;
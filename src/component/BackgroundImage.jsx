/* eslint-disable react/prop-types */
import styled from "styled-components"

function BackgroundImage() {
    return (
        <Container>
            <img
                src={
                    "https://source.unsplash.com/2560x1600/?paper,pen,notebook"
                }
                alt="background image"
            />
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(5, 49, 47);
    img {
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        mask-image: linear-gradient(
            to right bottom,
            rgba(20, 20, 20, 0) 0,
            rgba(20, 20, 20, 0.15) 15%,
            rgba(20, 20, 20, 0.35) 29%,
            rgba(20, 20, 20, 0.58) 44%,
            #141414 68%,
            #141414 100%
        );
        -webkit-mask-image: linear-gradient(
            to right bottom,
            rgba(20, 20, 20, 0) 0,
            rgba(20, 20, 20, 0.15) 15%,
            rgba(20, 20, 20, 0.35) 29%,
            rgba(20, 20, 20, 0.58) 44%,
            #141414 68%,
            #141414 100%
        );
    }
`
export default BackgroundImage

import styled from "styled-components"


const getBackground = (condition: string) => {
  switch (condition) {
    case "rainy": return "linear-gradient(to top, #667db6, #0082c8)";
    case "cloudy": return "linear-gradient(to top, #d3d3d3, #a6a6a6)";
    case "sunny": return "linear-gradient(to top, #ffcc33, #ff9966)";
    case "clear-night": return "linear-gradient(to top, #1a237e, #000051)";
    case "snowy": return "linear-gradient(to top, #d0eaff, #a0cfff)";
    case "thunderstorm": return "linear-gradient(to top, #4c4c4c, #1f1f1f)";
    case "drizzle": return "linear-gradient(to top, #76a9c0, #4b7c9f)";
    case "fog":
    case "mist": return "linear-gradient(to top, #a8a8a8, #757575)";
    default: return "linear-gradient(to top, #cccccc, #ffffff)";
  }
};


export const WeatherContainerStyled = styled('div')<{ $condition: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  transition: background 0.5s ease-in-out;
  background: ${(props) => getBackground(props.$condition)};
`;
import { createGlobalStyle } from "styled-components";

export const lightTheme = {
	fontColor: "#2c2c2c",
	bgColor: "lightgray",
};
  
export const darkTheme = {
	fontColor: "lightgray",
	bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
	html {
		height: 100%;
	}
	body {
		height: 100%;
	}
	
	#root {
		height: 100%;
	}

	.shadow-bold {
		box-shadow: 2px 2px 0px 2px rgb(0 0 0 / 0.1), 2px 2px 0px 2px rgb(0 0 0 / 0.1);
	}
`;
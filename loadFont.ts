import * as Font from "expo-font";

const loadFont = async () => {
  return await Font.loadAsync({
    "klavika-bold-italic": require("./fonts/klavika-bold-italic.otf"),
    "klavika-bold": require("./fonts/klavika-bold.otf"),
    "klavika-light-italic": require("./fonts/klavika-light-italic.otf"),
    "klavika-light": require("./fonts/klavika-light.otf"),
    "klavika-medium-italic": require("./fonts/klavika-medium-italic.otf"),
    "klavika-medium": require("./fonts/klavika-medium.otf"),
    "klavika-regular-italic": require("./fonts/klavika-regular-italic.otf"),
  });
};

export { loadFont };
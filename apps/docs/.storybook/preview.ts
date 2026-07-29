import "@arc-ui/tokens/tokens.css";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "oklch(0.12 0.02 240)" },
        { name: "light", value: "#ffffff" },
      ],
    },
    viewport: {
      defaultViewport: "responsive",
    },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        dark: "dark",
        light: "light",
      },
      defaultTheme: "dark",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;

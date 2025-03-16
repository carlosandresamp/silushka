import { render } from "@solidjs/testing-library";
import { vi } from "vitest";

import { THEME_LOCAL_STORAGE_KEY } from "../config";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "../model/context";
import { Theme } from "../model/types";

const Example = () => {
  const theme = useTheme();

  return (
    <>
      <span data-testid="theme">{theme.theme}</span>
      <button onClick={() => theme.setTheme("auto")}>Set theme to auto</button>
      <button onClick={() => theme.setTheme("light")}>Set theme to light</button>
      <button onClick={() => theme.setTheme("dark")}>Set theme to dark</button>
    </>
  );
};

describe("ThemeProvider", () => {
  const mockPrefersDark = (prefersDark = false) => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: prefersDark,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  };

  const renderWithThemeProvider = () => {
    return render(() => (
      <ThemeProvider>
        <Example />
      </ThemeProvider>
    ));
  };

  beforeAll(() => {
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn(),
    }));
  });

  describe("when localStorage has no theme set", () => {
    it("should default to auto theme and set document theme to light", () => {
      mockPrefersDark(false);
      const { getByTestId } = renderWithThemeProvider();
      const theme = getByTestId("theme");

      expect(theme).toHaveTextContent("auto" as Theme);
      expect(document.documentElement.dataset.theme).toBe("light" as Theme);
    });

    it("should default to auto theme and set document theme to dark", () => {
      mockPrefersDark(true);
      const { getByTestId } = renderWithThemeProvider();
      const theme = getByTestId("theme");

      expect(theme).toHaveTextContent("auto" as Theme);
      expect(document.documentElement.dataset.theme).toBe("dark" as Theme);
    });
  });

  describe("when localStorage has a theme set", () => {
    afterEach(() => {
      localStorage.clear();
    });

    it("should use the light theme from localStorage", () => {
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify("light" as Theme));
      const { getByTestId } = renderWithThemeProvider();
      const theme = getByTestId("theme");

      expect(theme).toHaveTextContent("light" as Theme);
      expect(document.documentElement.dataset.theme).toBe("light" as Theme);
    });

    it("should use the dark theme from localStorage", () => {
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify("dark" as Theme));
      const { getByTestId } = renderWithThemeProvider();
      const theme = getByTestId("theme");

      expect(theme).toHaveTextContent("dark" as Theme);
      expect(document.documentElement.dataset.theme).toBe("dark" as Theme);
    });

    it("should use the auto theme from localStorage with light preference", () => {
      mockPrefersDark(false);
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify("auto" as Theme));
      const { getByTestId } = renderWithThemeProvider();
      const theme = getByTestId("theme");

      expect(theme).toHaveTextContent("auto" as Theme);
      expect(document.documentElement.dataset.theme).toBe("light" as Theme);
    });

    it("should use the auto theme from localStorage with dark preference", () => {
      mockPrefersDark(true);
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify("auto" as Theme));
      const { getByTestId } = renderWithThemeProvider();
      const theme = getByTestId("theme");

      expect(theme).toHaveTextContent("auto" as Theme);
      expect(document.documentElement.dataset.theme).toBe("dark" as Theme);
    });

    it("should use the auto theme when an invalid theme is stored in localStorage", () => {
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify("incorrect" as Theme));
      const { getByTestId } = renderWithThemeProvider();
      const theme = getByTestId("theme");

      expect(theme).toHaveTextContent("auto" as Theme);
    });
  });

  describe("button interactions", () => {
    afterEach(() => {
      localStorage.clear();
    });

    it("should update the theme to 'light' when the 'Set theme to light' button is clicked", async () => {
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify("auto" as Theme));
      const { getByTestId, getByText } = renderWithThemeProvider();
      const theme = getByTestId("theme");

      getByText("Set theme to light").click();

      expect(theme).toHaveTextContent("light" as Theme);
      expect(document.documentElement.dataset.theme).toBe("light" as Theme);
    });

    it("should update the theme to 'dark' when the 'Set theme to dark' button is clicked", async () => {
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify("auto" as Theme));
      const { getByTestId, getByText } = renderWithThemeProvider();
      const theme = getByTestId("theme");

      getByText("Set theme to dark").click();

      expect(theme).toHaveTextContent("dark" as Theme);
      expect(document.documentElement.dataset.theme).toBe("dark" as Theme);
    });

    it("should switch to 'auto' theme and set document theme to 'light' when the 'Set theme to auto' button is clicked with light preference", async () => {
      mockPrefersDark(false);
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify("dark" as Theme));
      const { getByTestId, getByText } = renderWithThemeProvider();
      const theme = getByTestId("theme");

      getByText("Set theme to auto").click();

      expect(theme).toHaveTextContent("auto" as Theme);
      expect(document.documentElement.dataset.theme).toBe("light" as Theme);
    });

    it("should switch to 'auto' theme and set document theme to 'dark' when the 'Set theme to auto' button is clicked with dark preference", async () => {
      mockPrefersDark(true);
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify("light" as Theme));
      const { getByTestId, getByText } = renderWithThemeProvider();
      const theme = getByTestId("theme");

      getByText("Set theme to auto").click();

      expect(theme).toHaveTextContent("auto" as Theme);
      expect(document.documentElement.dataset.theme).toBe("dark" as Theme);
    });
  });
});

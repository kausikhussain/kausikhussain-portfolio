"use client";

// Re-export from unified ThemeProvider for complete backward compatibility
export {
  ThemeProvider as IdentityModeProvider,
  useIdentityMode,
  useTheme,
  type ProfessionTheme as IdentityMode,
  THEME_CONFIG,
} from "./ThemeProvider";

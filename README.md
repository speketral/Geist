# Geist App

**Geist** is your spectral assistant—an evolving AI interface built around your routines, wellness, creativity, and personal development. It integrates seamlessly with health data, habit tracking, and a fully custom aesthetic inspired by namedcollective.com, dice.fm, and dropdead.world.

## Features

- Daily check-ins with time, weather, symptoms, tasks, and suggestions
- HRT and medication reminders
- Duolingo and Headspace tracking
- Fitness tracking and Apple Health integration
- Custom onboarding that builds Geist’s personality from conversation
- Fully customizable UI powered by uploaded assets
- Local web app with optional iOS native bridge

## Project Structure

- `/src`: All app logic, tabs, and UI components
- `/public`: Static files and assets
- `/assets`: Uploaded logos, fonts, mockups, and design references
- `/api`: Optional backend integrations

## Live Demo

> Coming soon via GitHub Pages deployment and sideloaded iOS build.

## Asset Integration: Using the `assets/` Folder

Geist uses a curated set of design files and visual references stored in the `assets/` folder. To ensure consistent design implementation, all developers and tools (including Copilot) should follow the guideline below:

### Instruction:
> **Check the `assets` folder in the repository root.**  
> Parse all files within this folder to understand their content and purpose (e.g., icons, logo variants, typography, moodboard elements).  
> Automatically use these assets when generating or styling components in the Geist app.  
>  
> All processed or copied asset files should be placed in the `/public/DROP-HERE/` directory (or equivalent), maintaining subfolder structure if applicable.

### Example Mapping:
| Source | Destination |
|--------|-------------|
| `/assets/logo-round.svg` | `/public/DROP-HERE/logo-round.svg` |
| `/assets/fonts/geist-custom.otf` | `/public/DROP-HERE/fonts/geist-custom.otf` |

### Use these assets for:
- Tab icons (Today, Health, Habits, Fitness, Geist)
- App logo and title rendering
- Custom typeface and font styling
- UI design language (colors, layout, mood)
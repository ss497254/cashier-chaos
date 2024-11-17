# Game-template

This template is designed to help developers easily create games that integrate with the our platform.
Games built using this template will follow the standard structure.
The goal is to make it easy for developers to create interactive and engaging games that meet the requirements for data collection and analysis in our cognitive assessment system.

## General Instructions for Using the Game Package Template

This template sets up a React component for a game using Vite and TypeScript. This template exports GameComponent a react component that accepts some props, and it render the game.
That component can be configured with props for handling success and error events, and for specifying game level details.

This template is to be used as a package. You will add your changes in this project and we will import them, so you will not have any dependency on us, and you will be independent to use your own tech. For us to use the package you have to create a release. You can create a release by going to repo home page on github, then on the right side below about section you will find the option to create a release.

### Plan

1. **Initialize the project:**

   - Follow the instructions (given below) to initialize the project

1. **Implement the `GameComponent`:**

   - Use the `levelInfo` prop to configure the game.
   - Trigger `onGameSuccess` and `onGameError` based on game events.

1. **Making your changes:**
   You are free to use your tech, but there are some few suggestions.

   - Use zustand
   - Use tailwindcss
   - Use typescript.
   - Folder names and file names should be in snake case, example `src/componets/home-page/some-file.tsx`.
   - Refactor your code if it goes beyond 200 lines in any file.
   - Don't add unnecessary or dead code.

1. **Configure the package for use in a monorepo:**

   - Update `package.json` file with the necessary fields.
   - Ensure the package can be built and consumed by other packages.

1. **Document the props:**

   - Explain the purpose and usage of each prop.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/game-template.git
   ```
2. Navigate to the directory:
   ```bash
   cd game-template
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Folder Structure

The project directory is structured as follows:

```
game-template/
├── public/              # Static files (assets, icons, etc.)
├── src/
│   ├── components/      # Game UI components
│   ├── hooks/           # Custom hooks for data and game logic
│   ├── stores/          # State Management stores using zustand
│   ├── styles/          # Styling and layout files
│   └── Game.tsx         # This file is the entry point of the game
├── tests/               # Test files for ensuring quality and correctness
├── README.md            # Documentation
└── package.json         # Project configuration
```

## Usage

1. Customize the game:

   - Navigate to the `src/Game.tsx` file to implement your game’s core logic.
   - Use `tailwindcss` provided in the template to style your game.

2. Modify UI Components:

   - You can extend the existing UI components in the `components/` directory or create new ones as needed.

3. Run the development server:
   ```bash
   npm run dev
   ```
   This will start the server and open the app in your default browser at `http://localhost:3000`.

Feel free to adjust the content based on your specific needs!

### Props Explanation

Your GameComponent is expected to receive this props

- **`onGameSuccess` (required):**

  - **Type:** `() => void`
  - **Description:** A callback function that is triggered when the game is successfully completed. This allows the parent component to handle game success events, such as updating the UI or progressing to the next level.

- **`onGameError` (required):**

  - **Type:** `() => void`
  - **Description:** A callback function that is triggered when an error occurs in the game. This allows the parent component to handle game error events, such as displaying an error message or resetting the game state.

- **`levelInfo` (required):**
  - **Type:** `{ level: number; time: number; lives: number }`
  - **Description:** An object containing configuration details for the game level. This allows the parent component to specify the game settings, such as the current level, the time allocated for the level, and the number of lives available.
  - **Properties:**
    - `level`: The current level of the game.
    - `time`: The time allocated for the game level.
    - `lives`: The number of lives available in the game level.
    - It can have other properties as well based on the requirements.

### Commit Messages

- Use clear and descriptive commit messages.
- Follow the conventional commits format:

  - `feat`: A new feature.
  - `fix`: A bug fix.
  - `docs`: Documentation changes.
  - `style`: Code style changes (formatting, missing semi-colons, etc.).
  - `refactor`: Code refactoring without changing functionality.
  - `test`: Adding or updating tests.
  - `chore`: Changes to the build process or auxiliary tools.

  Example:

  ```
  feat: add new game level configuration
  fix: resolve issue with game timer
  docs: update README with usage instructions
  ```

## Publishing the Package

### 1. Update `package.json`

Make sure the `package.json` file contains the correct metadata for your package, including:

- **name**: A unique name for your package it should start with `@creaitors/`. example `@creaitors/my-game-123`.
- **version**: Bump the version number according to [semantic versioning](https://semver.org/) rules (e.g., `1.0.0`, `1.1.0` for minor changes).
- **description**: Briefly describe your package (optional).
- **repository**: Add the repository URL.

### 2. Create a Release in GitHub

1. Go to your GitHub repository.
2. Navigate to the **Releases** section under the **Code** tab.
3. Click **Draft a new release**.
4. Fill in the release information:
   - **Tag version**: Use the version tag you just pushed (e.g., `v1.0.0`).
   - **Release title**: Give your release a meaningful title (e.g., "Initial Release" or "v1.0.0").
   - **Description**: Describe what’s included in the release, such as new features or bug fixes.
5. If needed, attach any relevant files (such as compiled versions of the game or documentation).
6. Click **Publish release**.

This will create an official release for your game template on GitHub, making it easy for others to access and use the specific version.

By following these steps, you can ensure that your game template is properly versioned and made available through npm and GitHub releases.

---

By adhering to these guidelines, you can ensure that the project remains consistent, maintainable, and easy to work with for all team members.

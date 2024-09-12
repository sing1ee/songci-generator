# Songci Generator

Songci Generator is a Next.js application that generates Chinese Song Dynasty style poems (宋词) and corresponding SVG illustrations using AI.

## Features

-   Generate Song Dynasty style poems using AI
-   Create SVG illustrations based on the generated poems
-   React-based user interface for poem generation and display
-   API routes for poem generation and SVG creation

## Technologies Used

-   [Next.js](https://nextjs.org/) - React framework for building the web application
-   [React](https://reactjs.org/) - JavaScript library for building user interfaces
-   [OpenAI API](https://openai.com/) - For AI-powered poem generation
-   [TailwindCSS](https://tailwindcss.com/) - For styling the application
-   [TypeScript](https://www.typescriptlang.org/) - For type-safe JavaScript development

## Prerequisites

-   Node.js (version 18 or higher recommended)
-   pnpm (package manager)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/songci-generator.git
    cd songci-generator
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your OpenAI API key:

    ```
    OPENAI_API_KEY=your_api_key_here
    ```

4. Run the development server:

    ```bash
    pnpm dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `src/app/`: Contains the main application code
    -   `components/`: React components (e.g., PoemForm, SvgDisplay)
    -   `api/`: API routes for poem generation and SVG creation
    -   `page.tsx`: Main page component
-   `src/lib/`: Utility functions and API clients
    -   `openai.ts`: OpenAI API integration

## Available Scripts

-   `pnpm dev`: Runs the app in development mode
-   `pnpm build`: Builds the app for production
-   `pnpm start`: Runs the built app in production mode
-   `pnpm lint`: Lints the codebase

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

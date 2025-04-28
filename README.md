# Bun React Native Web Demo

This project is a simple demonstration of a "Hello World" web page built using Bun as the toolchain and React Native Web as the framework.

## Project Structure

```
bun-react-native-web-demo
├── src
│   ├── App.tsx          # Main application component
│   ├── index.tsx       # Entry point of the application
│   └── components
│       └── HelloWorld.tsx # Component that displays "Hello, World!"
├── public
│   └── index.html      # HTML template for the application
├── package.json        # npm configuration file
├── tsconfig.json       # TypeScript configuration file
├── bunfig.toml         # Bun configuration file
└── README.md           # Project documentation
```

## Getting Started

1. **Install Bun**: Make sure you have Bun installed on your machine. You can install it from [Bun's official website](https://bun.sh/).

2. **Clone the Repository**: Clone this repository to your local machine.

   ```bash
   git clone <repository-url>
   cd bun-react-native-web-demo
   ```

3. **Install Dependencies**: Run the following command to install the necessary dependencies.

   ```bash
   bun install
   ```

4. **Run the Application**: Start the development server with the following command.

   ```bash
   bun run dev
   ```

5. **Open in Browser**: Navigate to `http://localhost:3000` in your web browser to see the "Hello, World!" message.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
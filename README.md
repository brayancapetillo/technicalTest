# technicalTest

This repository contains the implemented solution for a technical test, focusing on verifying multiples of predefined numbers within a user-specified range. The project is built using Ionic 7.2.0 and Angular 19, with Firebase integration for data storage.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development Guide](#development-guide)
- [Contributing](#contributing)
- [License](#license)

## Features

- Validate multiples of 3, 5, and 7 within a user-defined range.
- Store user query data in Firebase for historical tracking.
- Responsive and mobile-friendly UI.

## Technologies

- **Ionic 7.2.0** for building a modern, cross-platform mobile application.
- **Angular 19** for the web application framework.
- **Firebase** for real-time data storage and retrieval.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/brayancapetillo/technicalTest.git
   cd your-repository-folder
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your Firebase configuration in `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     firebaseConfig: {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     },
   };
   ```
4. Run the application:
   ```bash
   ionic serve
   ```

## Usage

1. Enter a range of numbers to check for multiples.
2. The application will display results for multiples of 3, 5, and 7.
3. Queries are stored in Firebase for future reference.

## Project Structure

- `src/app/` contains the core Angular components and services.
- `src/environments/` includes environment-specific configurations.

## Development Guide

This project was generated with Ionic CLI version 7.2.0.

### Development server
Run `ionic serve` for a development server. Navigate to `http://localhost:8100/`. The application will automatically reload if you change any of the source files.

### Code scaffolding
Run `ionic generate component component-name` to generate a new component. You can also use `ionic generate page|directive|pipe|service|class|guard|interface|enum|module`.

### Build
Run `ionic build` to build the project. The build artifacts will be stored in the `www/` directory.

### Running unit tests
Run `ng test` to execute the unit tests via Karma.

### Running end-to-end tests
Run `ionic capacitor run` or `ionic cordova run` to execute the app on a real device or emulator. To use e2e testing tools, additional packages need to be installed and configured.

### Further help
To get more help on the Ionic CLI, use `ionic help` or check out the [Ionic documentation](https://ionicframework.com/docs/cli/).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'sparkes: Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


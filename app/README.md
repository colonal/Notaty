# app

A new Flutter project.

## Getting Started

This project is a starting point for a Flutter application.

### Prerequisites

- Flutter SDK (check `pubspec.yaml` for version constraints)
- An instance of the [Notaty Server](https://github.com/colonal/Notaty/tree/main/server) running.

### Setup

1.  **Install Dependencies**

    ```bash
    flutter pub get
    ```

2.  **Configure Environment Variables**
    The mobile app requires the API base URL to connect to the backend server.

    1.  Create a `.env` file in the root of the `app/` directory.
    2.  Add the following variable:
        ```
        API_BASE_URL=http://localhost:5000
        ```
        _Note: Change the URL if your server is running elsewhere. It should point to the address of the backend server._

3.  **Run the Application**
    To run the application, you need to provide the environment variables during the build/run process.

    ```bash
    flutter run --dart-define-from-file=.env
    ```

## Folder Structure

```
app/
└── lib/
    ├── core/               # Core components (networking, DI, theming, etc.)
    │   ├── constant/       # Application constants
    │   ├── di/             # Dependency injection setup
    │   ├── enum/           # Enumerations
    │   ├── extension/      # Dart language extensions
    │   ├── model/          # Core data models
    │   ├── networking/     # API clients and networking setup
    │   ├── route/          # Navigation and routing
    │   ├── services/       # Shared services (e.g., storage)
    │   ├── theming/        # Application theme and styling
    │   └── widget/         # Shared custom widgets
    ├── features/           # Feature-based modules
    │   ├── auth/           # Authentication feature (login, register)
    │   │   ├── data/       # Data sources, models, and repositories
    │   │   ├── logic/      # BLoC/Cubit for state management
    │   │   └── screen/     # UI screens and widgets
    │   └── home/           # Home/Notes feature
    │       ├── data/       # Data sources, models, and repositories
    │       ├── logic/      # BLoC/Cubit for state management
    │       └── screen/     # UI screens and widgets
    └── main.dart           # Application entry point
```

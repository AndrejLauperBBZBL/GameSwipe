# Gameswipe

Gameswipe is a modern and dynamic gaming app that enables users to discover, swipe, and engage with their favorite games. The app includes features such as daily swipe suggestions, push notifications, user profiles with customizable profile pictures, and integration with the Supabase database for game management.

## Features

- **Game Swiping:** Discover new games by swiping, and mark games as "interested," "played," or "not interested."
- **User Authentication:** Simple username-based registration and login system using Supabase.
- **Profile Management:** Customize your profile with a profile picture using your device camera.
- **Push Notifications:** Daily reminders at 17:00 to encourage users to "Start Swiping ;)".
- **Local Notifications:** Notifications scheduled locally for app engagement.
- **Supabase Integration:** Store and fetch user data and game preferences seamlessly from the Supabase database.

## Installation

### Prerequisites

1. [Node.js](https://nodejs.org/)
2. [Ionic CLI](https://ionicframework.com/docs/cli/overview)
3. [Capacitor](https://capacitorjs.com/)
4. [Android Studio](https://developer.android.com/studio) or Xcode for iOS development
5. Supabase account and a configured project with appropriate tables

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/gameswipe.git
   cd gameswipe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create an `.env` file in the root directory and add your Supabase URL and API key:
     ```env
     SUPABASE_URL=your-supabase-url
     SUPABASE_KEY=your-supabase-key
     ```

4. Add Capacitor platforms:
   ```bash
   ionic capacitor add android
   ionic capacitor add ios
   ```

5. Build the project:
   ```bash
   ionic build
   ```

6. Sync Capacitor:
   ```bash
   ionic capacitor sync
   ```

## Running the App

### Development Server

1. Start the development server:
   ```bash
   ionic serve
   ```
2. Open the app in your browser at `http://localhost:8100`.

### Android/iOS

1. Open the platform project in Android Studio or Xcode:
   ```bash
   ionic capacitor open android
   ionic capacitor open ios
   ```

2. Build and run the app on a simulator or physical device.

## Database Schema

### Tables

- **Users**
  - `id`: UUID (Primary Key)
  - `username`: String
  - `created_at`: Timestamp
  - `profile_picture`: String (URL to the image)

- **Games**
  - `id`: Integer (Primary Key)
  - `title`: String
  - `genre`: String
  - `releaseDate`: Date
  - `imageUrl`: String
  - `price`: Float
  - `status`: Enum (active, played, not_interested)

- **Game Preferences**
  - `user_id`: UUID (Foreign Key to Users)
  - `game_id`: Integer (Foreign Key to Games)
  - `interested`: Boolean
  - `status`: Enum (played, not_interested)

## Project Structure

- `src/`
  - `app/`: Contains components, pages, and services
    - `pages/`: Individual app pages like Home, Profile, and Interested
    - `services/`: API and database interaction logic
  - `assets/`: Icons and splash screens
  - `environments/`: Configuration for development and production

## Assets

- **Icons and Splash Screens**
  - Icons: `icon-foreground.png`, `icon-background.png`
  - Splash Screens: `splash.png`, `splash-dark.png`

## Push Notifications

- Integrated with Capacitor Push Notifications and Firebase.
- Daily notifications scheduled using Capacitor Local Notifications.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

If you encounter issues or have questions, feel free to open an issue on the repository or contact the maintainers.

Happy Swiping!


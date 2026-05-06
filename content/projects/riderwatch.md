# RiderWatch - Riders Net Profit Watch App

A cross-platform fullstack application that helps delivery riders track their trips, fuel costs, expenses, and calculate true net profit. Available as a Flutter mobile app backed by a Node.js/Express REST API.

**Download APK:** [Google Drive](https://drive.google.com/drive/folders/19YzY_KKv0awOoEo9bl_ocrj1_k5KIrLE?usp=sharing) · **Mobile App Repo:** [RiderWatch](https://github.com/KaviduRavishanHasaranga/RiderWatch.git)

---

## The Problem

Delivery riders on platforms like PickMe, Helago and Uber Eats see their gross earnings in the app but that number doesn't reflect reality. After fuel, vehicle maintenance, platform fees, and time costs, a rider's actual take-home can be significantly lower. Most riders don't track this accurately.

**RiderWatch** solves this by giving riders a clear, real-time view of their true net profit.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | Flutter (Dart) |
| State Management | Riverpod |
| Backend API | Node.js, Express |
| Database | SQLite (via better-sqlite3) |
| Auth | JWT |
| Charts | fl_chart (Flutter) |
| Local Storage | SharedPreferences |

---

## Key Features

### 📊 Trip Tracking
- Log each delivery trip: start/end time, distance, platform, earnings
- Auto-calculate trip duration
- Tag trips by platform (PickMe, Helago, Uber Eats, FoodPanda, etc.)

### ⛽ Expense Tracking
- Log fuel fills: amount, price per litre, odometer reading
- Automatic fuel efficiency calculation (km/l)
- Other expense categories: maintenance, food, parking

### 💸 Net Profit Dashboard
- Real-time net profit = Gross earnings − Fuel − Other expenses
- Daily, weekly, and monthly breakdowns
- Visual charts with trend analysis

### 🎯 Goal Setting
- Set daily/monthly earnings targets
- Progress bar showing how close you are to your goal
- Alerts when on track vs. falling behind

### 📱 Offline-First
- All data stored locally on-device
- Syncs to backend when connected
- Works fully offline — important for riders in low-signal areas

---

## Architecture

```
Flutter App (Mobile)
│
│  HTTP/JSON (when online)
▼
Node.js / Express API
├── /auth          Login, refresh tokens
├── /trips         CRUD trip records
├── /expenses      CRUD expense records
└── /stats         Aggregated profit stats
│
▼
SQLite Database
(also mirrored locally in Flutter via SharedPreferences)
```

---

## Flutter App Structure

```bash
lib/
├── main.dart
├── providers/
│   ├── auth_provider.dart
│   ├── trip_provider.dart
│   └── expense_provider.dart
├── screens/
│   ├── dashboard_screen.dart
│   ├── add_trip_screen.dart
│   ├── add_expense_screen.dart
│   └── stats_screen.dart
├── widgets/
│   ├── profit_card.dart
│   ├── trip_list_tile.dart
│   └── earnings_chart.dart
└── services/
    ├── api_service.dart
    └── local_storage_service.dart
```

---

## Key Code: Net Profit Calculation

```dart
// providers/trip_provider.dart
@riverpod
class TripNotifier extends _$TripNotifier {
  @override
  List<Trip> build() => [];

  double get totalEarnings =>
    state.fold(0.0, (sum, t) => sum + t.earnings);

  double get totalFuelCost =>
    ref.read(expenseNotifierProvider)
       .where((e) => e.category == 'fuel')
       .fold(0.0, (sum, e) => sum + e.amount);

  double get netProfit => totalEarnings - totalFuelCost -
    ref.read(expenseNotifierProvider)
       .where((e) => e.category != 'fuel')
       .fold(0.0, (sum, e) => sum + e.amount);
}
```

---

## Backend API (Node.js)

```javascript
// routes/trips.js
router.get('/', authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { from, to } = req.query;

  const trips = db.prepare(`
    SELECT * FROM trips
    WHERE user_id = ?
      AND date BETWEEN ? AND ?
    ORDER BY date DESC
  `).all(userId, from ?? '2000-01-01', to ?? '2099-12-31');

  res.json({ success: true, data: trips });
});

router.post('/', authenticateToken, async (req, res) => {
  const { platform, earnings, distance, duration, date } = req.body;
  const { userId } = req.user;

  const result = db.prepare(`
    INSERT INTO trips (user_id, platform, earnings, distance, duration, date)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(userId, platform, earnings, distance, duration, date);

  res.status(201).json({ success: true, id: result.lastInsertRowid });
});
```

---

## Database Schema

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  platform TEXT NOT NULL,
  earnings REAL NOT NULL,
  distance REAL,
  duration INTEGER,        -- minutes
  date TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  category TEXT NOT NULL,  -- fuel | maintenance | food | other
  amount REAL NOT NULL,
  note TEXT,
  date TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

## Challenges & Solutions

### Challenge: Offline-First Sync
Riders often work in areas with poor connectivity. The app needed to work fully offline and sync data when back online.

**Solution**: All writes go to local `SharedPreferences` / SQLite first, with a background sync queue. On reconnect, the app pushes queued changes to the API and resolves any conflicts (last-write-wins for trip records).

### Challenge: Accurate Fuel Cost per Trip
Fuel cost can't be assigned to a single trip — a tank fill covers many trips.

**Solution**: Calculate a rolling fuel cost per km using the last odometer reading, then apportion it to each trip based on its distance.

---

## What I Learned

- Offline-first architecture with sync queues is fundamentally different from always-online apps
- Flutter's Riverpod makes it clean to derive complex calculations from primitive state
- SQLite's `better-sqlite3` is synchronous and blazing fast for simple single-user data
- Building for a non-technical audience (delivery riders) means UI/UX has to be extremely simple and forgiving

---
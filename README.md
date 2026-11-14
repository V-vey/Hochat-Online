# Hochat Online

**A Web-Based Food Ordering System for Hochat Café**

WMA4 – Advanced Web Development · Group 2 · Tarlac State University, College of Computer Studies

Hochat Online lets customers of Hochat Café browse the menu, add food to a cart, and order for dine-in or delivery (within Gerona), paying cash on delivery or at the counter. Staff and the administrator manage the menu, process orders, and view an order status report.

---

## Features

### Customer (User)

- Create an account, log in, and reset a forgotten password
- Edit profile: name, email, phone, delivery address and password
- Browse the menu by category, search items, and see photos, prices and sold-out items
- Shopping cart: add, remove and change quantities
- Checkout: **Dine-In** or **Delivery** (₱50 flat delivery fee, Gerona addresses only), with optional pre-order time
- Payment: **Cash on Delivery / Pay at Counter** (no online payment)
- Transactions: order history and receipts, with status updates refreshing automatically
- Cancel an order within **1 minute** while it is still Pending

### Staff

- Add, edit and hide menu items (mark as sold out), upload photos, update prices
- View all orders, filter by status and date, and move them through **Pending → Preparing → Ready → Completed**, or **Cancel** them
- **Order Status Report**: orders by status, completed sales and an order list for any date range (printable)

### Administrator

- Everything Staff can do
- **Permanently delete** menu items (items already in past orders are protected; mark them sold out instead)

### Roles and permissions

| Permission                                            | User | Staff | Administrator |
| ----------------------------------------------------- | :--: | :---: | :-----------: |
| Register, log in, browse menu, cart, checkout         |  ✅  |   –   |       –       |
| View own orders; cancel within 1 minute while Pending |  ✅  |   –   |       –       |
| Add / edit / hide menu items, update prices           |  –   |  ✅   |      ✅       |
| Permanently delete menu items                         |  –   |   –   |      ✅       |
| View all orders and update their status               |  –   |  ✅   |      ✅       |
| View the Order Status Report                          |  –   |  ✅   |      ✅       |

---

## Tech Stack

| Layer             | Technology                                                                          |
| ----------------- | ----------------------------------------------------------------------------------- |
| Back end          | PHP 8.5, **Laravel 13** (MVC, Eloquent ORM, Form Requests, Policies)                |
| Front end         | **Inertia.js v3 + React 19 (TypeScript)**, **Tailwind CSS v4**, Laravel Wayfinder   |
| Database          | **MySQL**                                                                           |
| REST API          | Laravel **Sanctum** (token authentication), JSON resources, tested with **Postman** |
| Testing           | **Pest** (feature tests), Pint (PHP style), Vite+ lint/format, TypeScript           |
| Local environment | **Laragon** (Apache/MySQL), VS Code                                                 |
| Version control   | Git / GitHub                                                                        |
| Hosting           | _To be decided by the group_                                                        |

---

## Getting Started (local)

### Requirements

- PHP 8.5 and Composer (the project is built and tested on PHP 8.5; Laragon's bundled PHP 8.3 is too old for some packages)
- Node.js 22+ and npm
- MySQL (Laragon is recommended)

### 1. Install

From the submitted ZIP, unzip it and open a terminal in the `hochat-online` folder. From GitHub, clone it first:

```bash
git clone https://github.com/V-vey/Hochat-Online.git
cd Hochat-Online
```

Then install the packages and create the settings file:

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
```

### 2. Set up the database

Create a MySQL database called `hochat_online` (in Laragon: **Database → Create**). The `.env` copied from `.env.example` already has these settings for Laragon's default MySQL (user `root`, no password). Change them only if your MySQL is set up differently:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hochat_online
DB_USERNAME=root
DB_PASSWORD=
APP_URL=http://localhost:8000
```

Then load the tables and sample data, using **either** option:

- **Option A: import the included SQL file.** In Laragon open **Database** (HeidiSQL or phpMyAdmin), select `hochat_online`, and import `database/hochat_online.sql`. Or from a terminal:

  ```bash
  mysql -u root hochat_online < database/hochat_online.sql
  ```

- **Option B: build it with Laravel.**

  ```bash
  php artisan migrate --seed
  ```

Both give the same tables, the 85-item menu and the sample accounts below. Finally, link the photo storage:

```bash
php artisan storage:link
```

### 3. Run it

Start **MySQL in Laragon** first, then:

```bash
composer run dev
```

This starts both Laravel and Vite. Open **http://localhost:8000**.

To run it without Vite (for example, just to test the system), build the frontend once and start only Laravel:

```bash
npm run build
php artisan serve
```

### Sample accounts

All passwords are `password`.

| Role          | Email               |
| ------------- | ------------------- |
| Administrator | `admin@hochat.test` |
| Staff         | `staff@hochat.test` |
| Customer      | `user@hochat.test`  |

> **Password reset emails** are written to `storage/logs/laravel.log` in local development (`MAIL_MAILER=log`). Open the log and copy the reset link.

---

## Testing

```bash
php artisan test
```

Runs the Pest test suite on an in-memory SQLite database (your MySQL data is not touched). It covers login and registration, password reset, profile, menu, cart, checkout and delivery rules, the 1-minute cancel rule, staff order management, the report, role restrictions, and the API.

Before pushing, run the same checks as GitHub Actions:

```bash
npm run check
npm run types:check
vendor/bin/pint --test
```

Fix formatting automatically with `npx vp check --fix` and `vendor/bin/pint`.

---

## REST API

Base URL: `http://localhost:8000/api/v1`

Send `Accept: application/json` on every request. After logging in, send the token as `Authorization: Bearer <token>`.

| Method | Endpoint                       | Who          | Description                                                 |
| ------ | ------------------------------ | ------------ | ----------------------------------------------------------- |
| POST   | `/login`                       | anyone       | Get a token (`email`, `password`)                           |
| POST   | `/logout`                      | logged in    | Delete the current token                                    |
| GET    | `/menu`                        | anyone       | List menu items (`?search=`)                                |
| GET    | `/cart`                        | customer     | View cart                                                   |
| POST   | `/cart`                        | customer     | Add item (`menu_item_id`, `quantity`)                       |
| PATCH  | `/cart/{menuItem}`             | customer     | Change quantity (`quantity`)                                |
| DELETE | `/cart/{menuItem}`             | customer     | Remove item                                                 |
| POST   | `/cart/checkout`               | customer     | Place order from cart (`order_type`, `scheduled_time`)      |
| POST   | `/orders`                      | customer     | Place order directly (`order_type`, `items[]`)              |
| GET    | `/orders`                      | customer     | My orders                                                   |
| GET    | `/orders/{order}`              | customer     | One order with items                                        |
| PATCH  | `/orders/{order}/cancel`       | customer     | Cancel within 1 minute while Pending                        |
| GET    | `/admin/orders`                | staff, admin | All orders (`?status=`)                                     |
| PATCH  | `/admin/orders/{order}/status` | staff, admin | Set status (`Preparing`, `Ready`, `Completed`, `Cancelled`) |
| POST   | `/admin/menu-items`            | staff, admin | Create menu item                                            |
| PUT    | `/admin/menu-items/{menuItem}` | staff, admin | Update menu item                                            |
| DELETE | `/admin/menu-items/{menuItem}` | admin        | Delete menu item (not if it is in past orders)              |

Status codes used: `200` OK, `201` Created, `204` No Content, `401` not logged in, `403` not allowed, `404` not found, `422` validation error.

---

## Business Rules

- Order types: **Dine-In** and **Delivery** only (no pickup).
- Delivery adds a flat **₱50** fee and requires a profile address containing **"Gerona"**.
- Customers can cancel only within **1 minute** of ordering and only while the order is **Pending**.
- Staff cannot change orders that are already **Completed** or **Cancelled**.
- Menu items that appear in past orders cannot be deleted, so old receipts stay correct.
- Times use the **Asia/Manila** timezone.
- Order pages refresh automatically every 10 seconds (the report every 30 seconds).

---

## Project Structure

| Path                                              | What's inside                                        |
| ------------------------------------------------- | ---------------------------------------------------- |
| `app/Http/Controllers`                            | Customer controllers (menu, cart, orders, profile)   |
| `app/Http/Controllers/Admin`                      | Staff/admin pages: report, orders, menu items        |
| `app/Http/Controllers/Api/V1`                     | REST API controllers                                 |
| `app/Http/Requests`                               | Form validation                                      |
| `app/Models`                                      | `User`, `Category`, `MenuItem`, `Order`, `OrderItem` |
| `app/Policies/OrderPolicy.php`                    | Who can view and cancel an order                     |
| `app/Http/Middleware/EnsureUserHasRole.php`       | Role-based access (`role:Staff,Administrator`)       |
| `database/migrations`, `database/seeders`         | Tables and sample data                               |
| `resources/js/pages`                              | React pages                                          |
| `resources/js/layouts`, `resources/js/components` | Shared layout, header, footer and UI pieces          |
| `routes/web.php`, `routes/api.php`                | Website and API routes                               |
| `tests/Feature`                                   | Pest tests                                           |

---

## Team – Group 2

| Member                   | Role                                                |
| ------------------------ | --------------------------------------------------- |
| Tan, Sean Jedrek P.      | Group Leader / Project Manager & Documentation Lead |
| Manansala, Kian Wayne Q. | System Analyst / Diagrams                           |
| Rombaoa, Jayrald C.      | UI/UX Designer                                      |
| Bucud, Ralph Antoine S.  | Front-End Developer                                 |
| Lanuza, John Mathew C.   | Back-End Developer (Customer-Side)                  |
| Mercado, Regin Ray T.    | Back-End Developer (Admin/Staff-Side)               |
| Tayag, Harvey R.         | Database Developer / QA-Tester                      |

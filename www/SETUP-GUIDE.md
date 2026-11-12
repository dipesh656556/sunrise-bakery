# Sunrise Bakery Manager — Android App Setup Guide

This folder is your bakery app. It installs on an Android phone like a normal app (own icon, full screen, works without internet).

You do **3 things**, one time only:

1. (Optional but recommended) Create a free cloud database so all phones share the same orders.
2. Put the folder online (free).
3. Install it on the phone.

> **Only one phone, no sharing?** Skip step 1. The app works right away and saves data on that phone. Take a backup every week from **Backup & Restore**.

---

## Step 1 — Free cloud sync with Firebase (about 10 minutes)

1. Open https://console.firebase.google.com and sign in with your Google account.
2. Tap **Create a project** → name it `sunrise-bakery` → you can turn Google Analytics **off** → **Create**.
3. In the left menu: **Build → Authentication → Get started → Email/Password → Enable → Save**.
4. Still in Authentication, open the **Users** tab → **Add user**. Create one email + password for yourself, and one for each staff member.
5. In the left menu: **Build → Firestore Database → Create database**. Choose **Production mode** and a location near you (for Nepal, choose an Asia location such as `asia-south1`). Tap **Enable**.
6. Open the **Rules** tab of Firestore. Delete everything there, paste the contents of the file `firestore.rules` from this folder, and tap **Publish**. This makes sure only signed-in staff can see your data.
7. Click the gear icon ⚙ → **Project settings**. Scroll to **Your apps** → tap the web icon **`</>`** → name it `bakery` → **Register app**. You will see a block called `firebaseConfig`.
8. Open the file `config.js` in this folder with any text editor (Notepad is fine). Replace the `PASTE…` values with the values from Firebase. Save the file.

The free "Spark" plan is plenty for a bakery.

## Step 2 — Put the app online (free)

Pick **one**:

**Easiest — Netlify Drop**
1. Go to https://app.netlify.com/drop and sign in.
2. Drag this whole folder onto the page. In a few seconds you get a link like `https://something.netlify.app`.
3. In Firebase → **Authentication → Settings → Authorized domains**, add that domain (for example `something.netlify.app`).

**Alternative — GitHub Pages**
Upload the folder files to a new public GitHub repository, then **Settings → Pages → Deploy from branch**. Add the resulting `username.github.io` domain to Firebase **Authorized domains** the same way.

## Step 3 — Install on Android

1. Open your link in **Chrome** on the phone.
2. Sign in with the staff email and password.
3. Tap the **⋮ menu → Install app** (or **Add to Home screen**).
4. Open **Sunrise Bakery** from the home screen. Repeat on every staff phone.

After the first load, the app opens even without internet. Orders you add offline sync automatically when the phone is back online.

---

## Daily use

- **New order** → customer, phone, items (prices fill in from your menu), cake message, date and time, advance payment.
- **Start baking → Mark ready**: the "cake ready" WhatsApp message opens with the customer's number filled in. Check it, then tap **Send on WhatsApp** and press send in WhatsApp.
- **Delivered**: if money is still due, the app asks you to collect it.
- **Dashboard / Reports**: today's income, profit, orders due, money to collect, best-selling items.
- **Backup & Restore**: download a backup file weekly and keep a copy in Google Drive.

## About WhatsApp

The app opens WhatsApp with the message ready, and you tap send. Fully automatic sending with no tap needs the paid WhatsApp Business API, which is a separate business account and monthly cost. It can be added later if you grow.

## Want a real APK file?

1. Go to https://www.pwabuilder.com and enter your Netlify/GitHub link.
2. Choose **Package for stores → Android** and download the package. It contains the APK and instructions.

## Changing the app later

Edit the files, then upload the folder again (Netlify Drop again, or update GitHub). Phones update the next time they open the app with internet.

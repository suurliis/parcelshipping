### PARCEL SHIPPING APP

## Description

This is a small application to add parcels for shipping and view list of already present parcels.

## Installation and running the app

Backend:
Backend part can be found in /api directory. It runs by default on: http://localhost:3000
Start the application by:

```bash
$ cd api
$ npm install
$ npm run start
```

Database:
Database is hosted on cloud service and does not need anything extra. Database should be big enough to accomodate plenty of data for testing.

Frontend:
Frontend part can be found in /frontend directory. It runs by default on: http://localhost:4200

```bash
$ cd frontend
$ npm install
$ npm run start
```

## Application functionality

After successful launch, you should be able to see a blank landing page with blue navigation bar on http://localhost:4200.

### Adding parcels:
To add parcels, you can choose an action on the right of the navigation bar, by choosing 'Add'. This will forward you to page http://localhost:4200/add.
On this page, a form will open where you can enter:

* SKU - unique tracking number for parcels. Form will notify if number has been already taken.
* Description - text field for describing parcels.
* Address - text field for address.
* Town - text field for the town.
* Country - text field for country.
*Delivery - date field for delivery date. Accepts only dates in format: YYYY-MM-DD. Frontend does not explicitly inform of dates in wrong format, but backend will reject those entries.

After successful entry, user will be redirected to page with all parcels.

### Viewing parcels:
To view parcels, you can choose an action on the right of the navigation bar, by choosing 'View'. This will forward you to page http://localhost:4200/view. Here you can view all parcels in database.
Form has two filters: text based search 'Filter by description' where by typing you can see all matching parcels and dropdown 'Filter by country' that filters parcels by hardcoded selection.

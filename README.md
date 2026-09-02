# EV Command Center

Prompt for Lovable — EV Operations Field App UI/UX

Design and build a premium, modern mobile-first EV Operations application for an internal field operations team.

This is a mobile-first application used by approximately 35 operations team members who work with EV batteries and vehicles in the field.

The application should feel like a combination of:

A premium fintech application such as PhonePe

A modern mobility application

A professional enterprise operations platform

A clean EV/automotive dashboard

Do not make it look like a traditional enterprise admin panel.

The UI should feel premium, rich, modern, fast, and extremely easy to use with one hand.

1. Main Objective

The application is an EV Operations Control Center.

Field operations users should be able to quickly:

See battery counts

Search for any battery

View complete battery information

See whether a battery is online/offline

Check battery health/status

Find which vehicle a battery is installed in

Check vehicle information

View battery telemetry

View battery location

View battery swap history

Check operational issues

Check alerts

Investigate a battery or vehicle quickly

The most important design principle is:

A field operator should be able to open the application and find any battery/vehicle information within a few seconds.

2. Mobile-First Design

Design primarily for a mobile screen.

Target approximately:

390 × 844 px

Modern Android phones

Modern iPhones

The application must be completely responsive.

Desktop/tablet support can exist, but mobile is the primary experience.

Design everything with thumb-friendly interaction in mind.

Avoid:

Tiny buttons

Dense desktop-style tables

Excessive text

Complicated menus

Too many navigation levels

Use:

Cards

Bottom sheets

Tabs

Bottom navigation

Large touch targets

Search

Quick actions

Expandable sections

Visual status indicators

3. Bottom Navigation

Use a premium bottom navigation similar to modern applications such as PhonePe.

There should be exactly 4 primary navigation items:

1. Home

Main operations dashboard.

2. Batteries

Battery search and battery list.

3. Vehicles

Vehicle search and vehicle information.

4. Issues

Operational issues, alerts, and investigations.

The bottom navigation should remain easily accessible.

Use clean icons with labels.

Example:

Home | Batteries | Vehicles | Issues

The active item should have a clear visual state.

4. Login Screen

Create a premium login screen.

Content:

EV Operations logo/app branding

Welcome message

Email/username field

Password field

Show/hide password

Login button

Forgot password

Version information

Keep it simple.

Do not add unnecessary authentication functionality.

The application is an internal operations application.

5. Home Dashboard

The Home screen is the most important screen.

Create a premium EV operations dashboard.

At the top:

Greeting

User name

Small profile/avatar

Notification icon

Example:

"Good morning, Rutik"

Below that, add a prominent global search bar:

🔍 Search battery, vehicle, BMS ID, IMEI, ICCID...

This should be one of the primary actions on the screen.

6. Battery Overview

Create a visually attractive battery overview section.

Show cards such as:

Total Batteries

12,540

Online

10,842

Offline

1,698

Critical

126

Use visually distinct status indicators.

The cards should not look like boring analytics cards.

Make them feel like modern mobile application components.

Consider horizontal scrolling cards if appropriate.

7. Battery Status Visualization

Create a premium visual summary of battery status.

For example:

       Battery Status

       86% Online

    ████████████████░░░

Online       10,842
Offline       1,698
Critical        126


Use subtle charts/donuts/progress indicators where useful.

Do not overload the screen with charts.

The dashboard should remain easy to scan.

8. Quick Actions

Create a Quick Actions section.

Actions could include:

Search Battery

Search Vehicle

Scan Battery

Recent Swaps

Open Issues

Alerts

Use attractive icon-based buttons/cards.

The most frequently used action should be:

Search Battery

9. Recent Activity

Create a Recent Activity section.

Example:

Recent Activity

Battery BMS-10482

🟢 Online

Last communication:
2 min ago

Battery BMS-28491

🔴 Offline

Last communication:
34 min ago

Battery BMS-98172

⚠️ Critical

Temperature alert

Allow users to tap an activity item to open the related entity.

10. Battery List Screen

Create a dedicated Batteries screen.

At the top:

Batteries

Search bar:

Search battery ID, BMS, IMEI, ICCID...

Below the search:

Filter chips:

All

Online

Offline

Critical

Charging

Battery cards should show:

Battery ID

BMS ID

Status

SOC

Last communication

Current vehicle

Location

Example:

BMS-10482                     🟢 Online

SOC
82%                        

Vehicle
MH12AB1234

Last seen
2 minutes ago

›


Make the entire card clickable.

11. Battery Details Screen

This is a critical screen.

When a user taps a battery, open a rich battery details page.

Header:

← Battery Details

BMS-10482
🟢 Online


Show a large SOC visualization:

       82%

    Battery SOC


Then show key information.

Battery Health

SOC

Voltage

Current

Temperature

Charging status

Battery health

Connectivity

Online/offline

Last communication

Signal strength

SIM status

Vehicle

Show:

Vehicle number

Vehicle ID

VCU ID

Location

Show a small map/location card.

Example:

📍 Mumbai

Last updated
2 minutes ago

[ View Location ]


12. Battery Information Sections

Use expandable sections or tabs.

Sections:

Overview

Basic battery information.

Telemetry

Latest telemetry parameters.

Vehicle

Current vehicle relationship.

Swaps

Battery swap history.

Location

Current/recent location.

Issues

Battery-specific issues.

Firmware

Firmware/version information.

Avoid displaying everything at once.

The user should be able to expand sections.

13. Telemetry UI

Create a modern telemetry section.

Show important parameters as cards:

SOC
82%

Voltage
52.4 V

Current
12.3 A

Temperature
31°C


Then show charts.

Examples:

SOC over time

Voltage over time

Temperature over time

Current over time

Provide time filters:

1H

6H

24H

7D

Make the charts clean and mobile-friendly.

14. Vehicle Screen

Create a Vehicles section similar to Batteries.

Users can search:

Vehicle number

VIN

Vehicle ID

VCU ID

Vehicle cards:

MH12AB1234

🟢 Active

Battery
BMS-10482

VCU
VCU-98212

Last seen
3 min ago


15. Vehicle Details

Show:

Vehicle Status

Active / Offline

Current Battery

Battery ID and SOC.

VCU

VCU ID and connectivity.

Location

Map/location.

Telemetry

Speed, GPS, SOC, etc.

Battery History

Previous batteries installed.

Swap History

Recent swaps.

16. Swap History

Create a visually attractive timeline.

Example:

Battery Swap History

Today
10:42 AM

BMS-10482
Installed in
MH12AB1234

        │
        │
Yesterday
6:31 PM

BMS-10482
Removed from
MH12AB8932


Show:

Date/time

Previous vehicle

New vehicle

Previous battery

New battery

Swap location

Use a timeline rather than a traditional table.

17. Issues Screen

Create an Issues section.

Show issue cards with:

Issue title

Battery/vehicle

Severity

Status

Time

Assigned team/member

Example:

🔴 Critical

Battery not communicating

BMS-10482

Last communication:
42 minutes ago

Investigating


Filters:

All

Critical

High

Medium

Low

Open

Resolved

18. Issue Details

When opening an issue, show:

Issue

Battery communication failure

Asset

BMS-10482

Severity

Critical

Status

Investigating

Created

Today, 10:42 AM

Last Communication

Today, 10:01 AM

Investigation Notes

Show a timeline of investigation activity.

Allow:

Add note

Update status

Assign issue

Keep the UI simple.

19. Global Search

Create a powerful global search experience.

When the user types:

BMS-10482

show categorized results:

Battery

BMS-10482

Vehicle

MH12AB1234

VCU

VCU-98212

Issues

2 active issues

Swaps

12 swap records

The goal is:

One search → complete investigation.

20. Scan Feature

Since this is an EV field operations application, consider adding a Scan Battery action.

The user could scan:

QR code

Barcode

Battery sticker

After scanning, immediately open the battery details page.

Make this a prominent Quick Action.

21. Premium Visual Design

The visual language should feel:

Premium

Modern

Professional

EV/automotive

Data-rich but clean

Minimal

High-end

Take inspiration from the UX principles of:

PhonePe

Uber

Tesla

Google Maps

modern fintech apps

modern EV applications

Do NOT copy their branding.

Use their design principles, not their exact UI.

22. Color System

Use a sophisticated EV-oriented color system.

Prefer:

Neutral/white backgrounds

Dark text

Strong primary accent

Green for healthy/online

Red for critical/offline

Orange/yellow for warnings

Subtle gray surfaces

Do not use excessive gradients.

Do not make every card colorful.

The application should look professional enough for an enterprise environment.

23. Typography

Use a modern sans-serif font.

Typography should have clear hierarchy:

Large dashboard numbers

Medium section titles

Small metadata

Strong status labels

Keep text highly readable on mobile.

24. Cards

Cards should have:

Rounded corners

Subtle borders/shadows

Clear hierarchy

Adequate spacing

Touch-friendly areas

Avoid excessive cards everywhere.

Use cards where they improve information hierarchy.

25. Interaction Design

Add polished interactions:

Skeleton loaders

Pull to refresh

Loading states

Empty states

Error states

Toast notifications

Bottom sheets

Smooth transitions

Expand/collapse sections

The application should feel fast even when data is loading.

26. Mobile Navigation

Use:

Bottom navigation

Home
Batteries
Vehicles
Issues

Use a floating/quick-action button if useful for:

Scan Battery

But don't allow it to interfere with the four primary navigation items.

27. Information Architecture

Use this structure:

Login
   ↓
Home
   ├── Global Search
   ├── Battery Overview
   ├── Quick Actions
   ├── Recent Activity
   └── Alerts

Batteries
   ├── Search
   ├── Filters
   └── Battery Details
          ├── Overview
          ├── Telemetry
          ├── Vehicle
          ├── Swaps
          ├── Location
          ├── Issues
          └── Firmware

Vehicles
   ├── Search
   └── Vehicle Details
          ├── Overview
          ├── Battery
          ├── Telemetry
          ├── Location
          └── Swap History

Issues
   ├── Issue List
   └── Issue Details


28. Important UX Principle

The application is used by field operations personnel, not software engineers.

Therefore users should NOT need to understand:

Database names

API names

InfluxDB

ClickHouse

Kafka

Internal service architecture

The application should translate technical information into a simple operational experience.

For example, instead of exposing raw database information:

influx measurement: battery_telemetry
device_status = 0


show:

🔴 Battery Offline

Last communication:
42 minutes ago


29. Deliverables

Create a complete clickable UI prototype containing at least:

Login

Home Dashboard

Battery List

Battery Details

Battery Telemetry

Vehicle List

Vehicle Details

Swap History

Issues List

Issue Details

Global Search

Scan Battery flow

Use realistic EV/battery sample data.

Make the prototype feel like a real production application, not a wireframe.

30. Most Important Requirement

The final design should communicate:

"One EV Operations Control Center in your pocket."

When an operations engineer opens the application, they should immediately understand:

How many batteries are active

Which batteries have problems

How to search a battery

How to investigate a vehicle

What is happening in the field

Which issues require attention

The experience should be premium, intuitive, fast, and operationally focused.

Do not build a generic CRUD dashboard.

Build a high-quality mobile EV operations product.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/856af1d4-05ea-448d-a5d4-6cebaccc6202).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

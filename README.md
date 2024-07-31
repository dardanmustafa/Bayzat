# Cypress Test for Bayzat

## Overview

This project contains automated tests for Bayzat's employee management system using Cypress. The primary test scenario involves logging into the application, adding a single employee twice, verifying their addition, searching those employees and then deleting them.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/dardanmustafa/Bayzat.git
   ```
   ```bash
   cd "Bayzat-main"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Tests

1. To run the tests use:
   ```bash
   npx cypress run -b chrome
   ```

After the test completes, a video recording of the test will be saved in the `videos` folder.

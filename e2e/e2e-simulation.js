import puppeteer from 'puppeteer-core';

const BASE_URL = 'http://127.0.0.1:5173';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const timestamp = Date.now();
const testCustomer = {
  username: `cust_alex_${timestamp}`,
  email: `alex_${timestamp}@example.com`,
  password: 'SecurePassword123!',
  full_name: 'Alex QA Customer',
  address: '742 Evergreen Terrace, Springfield',
  phone_number: '+15551234567',
};

const testDriver = {
  username: `driver_dave_${timestamp}`,
  email: `dave_${timestamp}@example.com`,
  password: 'SecurePassword123!',
  full_name: 'Dave Delivery Driver',
  vehicle_type: 'Mercedes Sprinter Van',
  phone_number: '+15559876543',
};

const testProduct1 = {
  name: `Sensors Box ${timestamp.toString().slice(-4)}`,
  description: 'Fragile laser sensors with protective cushioning',
  weight: '12.50',
  updatedName: `Sensors Box ${timestamp.toString().slice(-4)} (Calibrated)`,
  updatedDesc: 'Fragile laser sensors with protective cushioning - fully calibrated',
  updatedWeight: '13.25',
};

const testProduct2 = {
  name: `Cargo Pallet ${timestamp.toString().slice(-4)}`,
  description: 'Heavy duty industrial components for delivery',
  weight: '45.00',
};

const results = [];

function logResult(suite, testName, status, details = {}) {
  const item = { suite, testName, status, details, time: new Date().toISOString() };
  results.push(item);
  console.log(`[${status}] [${suite}] ${testName} - ${JSON.stringify(details)}`);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForTransition(page, extraWait = 500) {
  await sleep(650 + extraWait);
}

async function clearAndType(page, selector, text) {
  await page.click(selector, { clickCount: 3 });
  await page.keyboard.press('Backspace');
  await page.type(selector, text);
}

async function getErrorBadgeText(page) {
  return await page.$eval('[data-slot="badge"][data-variant="destructive"], [data-variant="destructive"]', el => el.innerText.trim()).catch(() => null);
}

async function runSimulation() {
  console.log('====================================================');
  console.log('STARTING REALISTIC E2E BROWSER USER SIMULATION');
  console.log('Frontend URL:', BASE_URL);
  console.log('====================================================');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[Browser Console Error] ${msg.text()}`);
    }
  });

  try {
    console.log('\n--- SUITE 1: HOME PAGE NAVIGATION ---');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
    const homeTitle = await page.title();
    if (homeTitle.includes('Storage Tracker System')) {
      logResult('Home', 'Homepage loads and title verifies', 'PASS', { title: homeTitle });
    } else {
      logResult('Home', 'Homepage loads and title verifies', 'FAIL', { title: homeTitle });
    }

    const customerCard = await page.$('a[href="/signup/customer"]');
    const driverCard = await page.$('a[href="/signup/driver"]');
    const loginCard = await page.$('a[href="/login"]');

    if (customerCard && driverCard && loginCard) {
      logResult('Home', 'Role cards and Login links exist on Homepage', 'PASS');
    } else {
      logResult('Home', 'Role cards and Login links exist on Homepage', 'FAIL');
    }

    console.log('\n--- SUITE 2: FORM VALIDATION & NEGATIVE TESTS ---');
    
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);
    await page.type('#username', 'non_existent_user_xyz');
    await page.type('#password', 'WrongPassword123!');
    await page.click('button[type="submit"]');
    await sleep(1500);

    const loginError = await getErrorBadgeText(page);
    if (loginError && loginError.includes('Invalid username or password')) {
      logResult('Validation', 'Invalid login credentials displays error badge', 'PASS', { error: loginError });
    } else {
      logResult('Validation', 'Invalid login credentials displays error badge', 'FAIL', { error: loginError });
    }

    await page.goto(`${BASE_URL}/signup/customer`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);
    await page.type('#username', `weak_user_${timestamp}`);
    await page.type('#email', `weak_${timestamp}@example.com`);
    await page.type('#password', '123'); 
    await page.type('#full_name', 'Weak Password User');
    await page.type('#address', '123 Test St');
    await page.type('#phone_number', '+1234567890');
    await page.click('button[type="submit"]');
    await sleep(1500);

    const weakPassError = await getErrorBadgeText(page);
    if (weakPassError && (weakPassError.toLowerCase().includes('short') || weakPassError.toLowerCase().includes('password'))) {
      logResult('Validation', 'Weak password triggers backend validation error badge', 'PASS', { error: weakPassError });
    } else {
      logResult('Validation', 'Weak password triggers backend validation error badge', 'FAIL', { error: weakPassError });
    }

    console.log('\n--- SUITE 3: REGULAR USER (CUSTOMER) FULL JOURNEY ---');

    await page.goto(`${BASE_URL}/signup/customer`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);

    await page.type('#username', testCustomer.username);
    await page.type('#email', testCustomer.email);
    await page.type('#password', testCustomer.password);
    await page.type('#full_name', testCustomer.full_name);
    await page.type('#address', testCustomer.address);
    await page.type('#phone_number', testCustomer.phone_number);

    await page.click('button[type="submit"]');
    await sleep(2000);
    await waitForTransition(page);

    const currentUrlAfterSignup = page.url();
    if (currentUrlAfterSignup.includes('/login')) {
      logResult('Customer', 'Registration successful and redirects to /login', 'PASS', { url: currentUrlAfterSignup });
    } else {
      logResult('Customer', 'Registration successful and redirects to /login', 'FAIL', { url: currentUrlAfterSignup });
    }

    await page.goto(`${BASE_URL}/signup/customer`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);
    await page.type('#username', testCustomer.username);
    await page.type('#email', testCustomer.email);
    await page.type('#password', testCustomer.password);
    await page.type('#full_name', testCustomer.full_name);
    await page.type('#address', testCustomer.address);
    await page.type('#phone_number', testCustomer.phone_number);
    await page.click('button[type="submit"]');
    await sleep(1500);

    const duplicateError = await getErrorBadgeText(page);
    if (duplicateError && (duplicateError.includes('already') || duplicateError.includes('failed') || duplicateError.includes('use'))) {
      logResult('Customer', 'Duplicate registration displays validation badge', 'PASS', { error: duplicateError });
    } else {
      logResult('Customer', 'Duplicate registration displays validation badge', 'FAIL', { error: duplicateError });
    }

    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);
    await page.type('#username', testCustomer.username);
    await page.type('#password', testCustomer.password);
    await page.click('button[type="submit"]');
    await sleep(2000);
    await waitForTransition(page);

    const currentUrlAfterLogin = page.url();
    if (currentUrlAfterLogin.includes('/CustomerDashboard')) {
      logResult('Customer', 'Login successful and routes to CustomerDashboard', 'PASS', { url: currentUrlAfterLogin });
    } else {
      logResult('Customer', 'Login successful and routes to CustomerDashboard', 'FAIL', { url: currentUrlAfterLogin });
    }

    const dashboardText = await page.evaluate(() => document.body.innerText);
    if (dashboardText.includes('No products found.') && dashboardText.includes('Add New Product')) {
      logResult('Customer', 'Dashboard shows initial empty state and Add Product action', 'PASS');
    } else {
      logResult('Customer', 'Dashboard shows initial empty state and Add Product action', 'FAIL');
    }

    await page.click('a[href="/products/add"]');
    await waitForTransition(page);

    await page.type('#name', testProduct1.name);
    await page.type('#description', testProduct1.description);
    await page.type('#weight', testProduct1.weight);
    await page.click('button[type="submit"]');
    await sleep(2000);
    await waitForTransition(page);

    const dashboardWithProd = await page.evaluate(() => document.body.innerText);
    if (dashboardWithProd.includes(testProduct1.name) && dashboardWithProd.includes('Pending')) {
      logResult('Customer', 'Product 1 created and displayed on Dashboard with Pending status', 'PASS');
    } else {
      logResult('Customer', 'Product 1 created and displayed on Dashboard with Pending status', 'FAIL');
    }

    const detailLink = await page.$eval('a[href*="/products/"]', el => el.getAttribute('href'));
    await page.click(`a[href="${detailLink}"]`);
    await waitForTransition(page);

    const detailPageContent = await page.evaluate(() => document.body.innerText);
    if (
      detailPageContent.includes(testProduct1.name) &&
      detailPageContent.includes(testProduct1.description) &&
      detailPageContent.includes(testProduct1.weight)
    ) {
      logResult('Customer', 'Product details match submitted data', 'PASS', { path: detailLink });
    } else {
      logResult('Customer', 'Product details match submitted data', 'FAIL');
    }

    const editLink = await page.$eval('a[href*="/edit"]', el => el.getAttribute('href'));
    await page.click(`a[href="${editLink}"]`);
    await waitForTransition(page);

    await clearAndType(page, '#name', testProduct1.updatedName);
    await clearAndType(page, '#description', testProduct1.updatedDesc);
    await clearAndType(page, '#weight', testProduct1.updatedWeight);
    await page.click('button[type="submit"]');
    await sleep(2000);
    await waitForTransition(page);

    const updatedDetailContent = await page.evaluate(() => document.body.innerText);
    if (
      updatedDetailContent.includes(testProduct1.updatedName) &&
      updatedDetailContent.includes(testProduct1.updatedDesc) &&
      updatedDetailContent.includes(testProduct1.updatedWeight)
    ) {
      logResult('Customer', 'Product updated successfully and details verified', 'PASS');
    } else {
      logResult('Customer', 'Product updated successfully and details verified', 'FAIL', { text: updatedDetailContent });
    }

    await page.click('.btnDelete');
    await sleep(500);

    const modalVisible = await page.$eval('.fixed.inset-0', el => el !== null).catch(() => false);
    if (modalVisible) {
      logResult('Customer', 'Delete confirmation modal appears with backdrop', 'PASS');
    } else {
      logResult('Customer', 'Delete confirmation modal appears with backdrop', 'FAIL');
    }

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const confirmBtn = buttons.find(b => b.textContent.includes('Confirm'));
      if (confirmBtn) confirmBtn.click();
    });
    await sleep(2000);
    await waitForTransition(page);

    const dashboardAfterDelete = await page.evaluate(() => document.body.innerText);
    if (!dashboardAfterDelete.includes(testProduct1.updatedName)) {
      logResult('Customer', 'Product deleted and removed from Customer Dashboard', 'PASS');
    } else {
      logResult('Customer', 'Product deleted and removed from Customer Dashboard', 'FAIL');
    }

    await page.click('a[href="/products/add"]');
    await waitForTransition(page);
    await page.type('#name', testProduct2.name);
    await page.type('#description', testProduct2.description);
    await page.type('#weight', testProduct2.weight);
    await page.click('button[type="submit"]');
    await sleep(2000);
    await waitForTransition(page);

    const dashboardWithProd2 = await page.evaluate(() => document.body.innerText);
    if (dashboardWithProd2.includes(testProduct2.name)) {
      logResult('Customer', 'Product 2 created for Driver pickup workflow', 'PASS');
    } else {
      logResult('Customer', 'Product 2 created for Driver pickup workflow', 'FAIL');
    }

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const logoutBtn = buttons.find(b => b.textContent.includes('Logout'));
      if (logoutBtn) logoutBtn.click();
    });
    await sleep(1500);
    await waitForTransition(page);

    const urlAfterLogout = page.url();
    const tokenAfterLogout = await page.evaluate(() => localStorage.getItem('access_token'));
    if (urlAfterLogout.includes('/login') && !tokenAfterLogout) {
      logResult('Customer', 'Logout clears tokens and redirects to /login', 'PASS');
    } else {
      logResult('Customer', 'Logout clears tokens and redirects to /login', 'FAIL');
    }

    await page.type('#username', testCustomer.username);
    await page.type('#password', testCustomer.password);
    await page.click('button[type="submit"]');
    await sleep(2000);
    await waitForTransition(page);

    const reLoginDashboard = await page.evaluate(() => document.body.innerText);
    if (reLoginDashboard.includes(testProduct2.name)) {
      logResult('Customer', 'Session persistence and data verified after re-login', 'PASS');
    } else {
      logResult('Customer', 'Session persistence and data verified after re-login', 'FAIL');
    }

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const logoutBtn = buttons.find(b => b.textContent.includes('Logout'));
      if (logoutBtn) logoutBtn.click();
    });
    await sleep(1000);

    console.log('\n--- SUITE 4: DRIVER FULL JOURNEY ---');

    await page.goto(`${BASE_URL}/signup/driver`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);

    await page.type('#username', testDriver.username);
    await page.type('#email', testDriver.email);
    await page.type('#password', testDriver.password);
    await page.type('#full_name', testDriver.full_name);
    await page.type('#vehicle_type', testDriver.vehicle_type);
    await page.type('#phone_number', testDriver.phone_number);
    await page.click('button[type="submit"]');
    await sleep(2000);
    await waitForTransition(page);

    const driverSignupUrl = page.url();
    if (driverSignupUrl.includes('/login')) {
      logResult('Driver', 'Driver registration successful and redirects to /login', 'PASS');
    } else {
      logResult('Driver', 'Driver registration successful and redirects to /login', 'FAIL', { url: driverSignupUrl });
    }

    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);
    await page.type('#username', testDriver.username);
    await page.type('#password', testDriver.password);
    await page.click('button[type="submit"]');
    await sleep(2000);
    await waitForTransition(page);

    const driverLoginUrl = page.url();
    if (driverLoginUrl.includes('/DriverDashboard')) {
      logResult('Driver', 'Driver login routes directly to DriverDashboard', 'PASS', { url: driverLoginUrl });
    } else {
      logResult('Driver', 'Driver login routes directly to DriverDashboard', 'FAIL', { url: driverLoginUrl });
    }

    const driverDashboardText = await page.evaluate(() => document.body.innerText);
    if (driverDashboardText.includes('Add New') && driverDashboardText.includes('Logout')) {
      logResult('Driver', 'Driver dashboard loaded with Add Request and Logout actions', 'PASS');
    } else {
      logResult('Driver', 'Driver dashboard loaded with Add Request and Logout actions', 'FAIL');
    }

    await page.evaluate(() => {
      const link = document.querySelector('a[href="/Request/add"], a[href="/request/add"]');
      if (link) link.click();
    });
    await waitForTransition(page);

    const addRequestContent = await page.evaluate(() => document.body.innerText);
    if (addRequestContent.includes(testProduct2.name)) {
      logResult('Driver', 'Available pending customer product visible to driver', 'PASS', { product: testProduct2.name });
    } else {
      logResult('Driver', 'Available pending customer product visible to driver', 'FAIL');
    }

    await page.evaluate((prodName) => {
      const cards = Array.from(document.querySelectorAll('.card'));
      const targetCard = cards.find(c => c.innerText.includes(prodName));
      if (targetCard) {
        const pickupBtn = targetCard.querySelector('button');
        if (pickupBtn) pickupBtn.click();
      } else {
        const anyBtn = document.querySelector('button.btn-outline-light');
        if (anyBtn) anyBtn.click();
      }
    }, testProduct2.name);
    await sleep(500);

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const confirmBtn = buttons.find(b => b.textContent.includes('Confirm Pickup') || b.textContent.trim() === 'Confirm');
      if (confirmBtn) confirmBtn.click();
    });

    await sleep(2000);
    await waitForTransition(page);

    const driverDashboardAfterClaim = await page.evaluate(() => document.body.innerText);
    if (driverDashboardAfterClaim.includes(testProduct2.name)) {
      logResult('Driver', 'Product claimed, DriverRequest created and visible on Dashboard', 'PASS');
    } else {
      logResult('Driver', 'Product claimed, DriverRequest created and visible on Dashboard', 'FAIL', { text: driverDashboardAfterClaim });
    }

    await page.evaluate((prodName) => {
      const cards = Array.from(document.querySelectorAll('.card'));
      const targetCard = cards.find(c => c.innerText.includes(prodName));
      if (targetCard) {
        const link = targetCard.querySelector('a');
        if (link) link.click();
      } else {
        const firstLink = document.querySelector('a[href*="/Requests/"]');
        if (firstLink) firstLink.click();
      }
    }, testProduct2.name);
    await waitForTransition(page);

    const requestDetailsContent = await page.evaluate(() => document.body.innerText);
    if (
      requestDetailsContent.includes(testProduct2.name) &&
      requestDetailsContent.includes(testCustomer.full_name)
    ) {
      logResult('Driver', 'Request details display customer name and product information', 'PASS');
    } else {
      logResult('Driver', 'Request details display customer name and product information', 'FAIL', { text: requestDetailsContent });
    }

    await page.evaluate(() => {
      const link = document.querySelector('a[href*="/edit"]');
      if (link) link.click();
    });
    await waitForTransition(page);

    await page.select('#status', 'PickedUp');
    await page.click('button[type="submit"]');
    await sleep(2000);
    await waitForTransition(page);

    const dashboardStatusPickedUp = await page.evaluate(() => document.body.innerText);
    if (dashboardStatusPickedUp.includes('PickedUp')) {
      logResult('Driver', 'Request status updated to PickedUp and verified on Dashboard', 'PASS');
    } else {
      logResult('Driver', 'Request status updated to PickedUp and verified on Dashboard', 'FAIL', { text: dashboardStatusPickedUp });
    }

    await page.evaluate((prodName) => {
      const cards = Array.from(document.querySelectorAll('.card'));
      const targetCard = cards.find(c => c.innerText.includes(prodName));
      if (targetCard) {
        const link = targetCard.querySelector('a');
        if (link) link.click();
      }
    }, testProduct2.name);
    await waitForTransition(page);

    await page.evaluate(() => {
      const link = document.querySelector('a[href*="/edit"]');
      if (link) link.click();
    });
    await waitForTransition(page);

    await page.select('#status', 'Stored');
    await page.click('button[type="submit"]');
    await sleep(2000);
    await waitForTransition(page);

    const dashboardStatusStored = await page.evaluate(() => document.body.innerText);
    if (dashboardStatusStored.includes('Stored')) {
      logResult('Driver', 'Request status updated to Stored and verified on Dashboard', 'PASS');
    } else {
      logResult('Driver', 'Request status updated to Stored and verified on Dashboard', 'FAIL', { text: dashboardStatusStored });
    }

    await page.evaluate((prodName) => {
      const cards = Array.from(document.querySelectorAll('.card'));
      const targetCard = cards.find(c => c.innerText.includes(prodName));
      if (targetCard) {
        const link = targetCard.querySelector('a');
        if (link) link.click();
      }
    }, testProduct2.name);
    await waitForTransition(page);

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const cancelBtn = buttons.find(b => b.textContent.includes('Cancel Request'));
      if (cancelBtn) cancelBtn.click();
    });
    await sleep(500);

    const cancelModalVisible = await page.$eval('.fixed.inset-0', el => el !== null).catch(() => false);
    if (cancelModalVisible) {
      logResult('Driver', 'Cancel request confirmation modal appears with backdrop', 'PASS');
    } else {
      logResult('Driver', 'Cancel request confirmation modal appears with backdrop', 'FAIL');
    }

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const backBtn = buttons.find(b => b.textContent.trim() === 'Back');
      if (backBtn) backBtn.click();
    });
    await sleep(500);

    await page.goto(`${BASE_URL}/DriverDashboard`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const logoutBtn = buttons.find(b => b.textContent.includes('Logout'));
      if (logoutBtn) logoutBtn.click();
    });
    await sleep(1500);
    await waitForTransition(page);

    await page.type('#username', testDriver.username);
    await page.type('#password', testDriver.password);
    await page.click('button[type="submit"]');
    await sleep(2000);
    await waitForTransition(page);

    const driverReloginText = await page.evaluate(() => document.body.innerText);
    if (driverReloginText.includes(testProduct2.name) && driverReloginText.includes('Stored')) {
      logResult('Driver', 'Driver session and stored request persistence verified', 'PASS');
    } else {
      logResult('Driver', 'Driver session and stored request persistence verified', 'FAIL');
    }

    console.log('\n--- SUITE 5: SECURITY & ROLE-BASED ACCESS CONTROL (RBAC) ---');

    await page.goto(`${BASE_URL}/products/add`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);

    await page.type('#name', 'Unauthorized Driver Product');
    await page.type('#description', 'This should be blocked by backend');
    await page.type('#weight', '10');
    await page.click('button[type="submit"]');
    await sleep(1500);

    const driverAddProductError = await getErrorBadgeText(page);
    if (driverAddProductError && driverAddProductError.includes('Failed to add product')) {
      logResult('RBAC', 'Driver blocked from creating customer product by backend (404 Customer not found)', 'PASS', { error: driverAddProductError });
    } else {
      logResult('RBAC', 'Driver blocked from creating customer product by backend', 'FAIL', { error: driverAddProductError });
    }

    await page.evaluate(() => localStorage.clear());

    await page.goto(`${BASE_URL}/CustomerDashboard`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);
    const unauthCustomerContent = await page.evaluate(() => document.body.innerText);
    if (unauthCustomerContent.includes('Something went wrong') || page.url().includes('/login')) {
      logResult('RBAC', 'Unauthenticated access to CustomerDashboard rejected by backend JWT requirement', 'PASS');
    } else {
      logResult('RBAC', 'Unauthenticated access to CustomerDashboard rejected by backend JWT requirement', 'FAIL');
    }

    await page.goto(`${BASE_URL}/DriverDashboard`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);
    const unauthDriverContent = await page.evaluate(() => document.body.innerText);
    if (unauthDriverContent.includes('Something went wrong') || page.url().includes('/login')) {
      logResult('RBAC', 'Unauthenticated access to DriverDashboard rejected by backend JWT requirement', 'PASS');
    } else {
      logResult('RBAC', 'Unauthenticated access to DriverDashboard rejected by backend JWT requirement', 'FAIL');
    }

    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);
    await page.type('#username', testCustomer.username);
    await page.type('#password', testCustomer.password);
    await page.click('button[type="submit"]');
    await sleep(2000);
    await waitForTransition(page);

    await page.goto(`${BASE_URL}/DriverDashboard`, { waitUntil: 'networkidle0' });
    await waitForTransition(page);
    const customerOnDriverDashboard = await page.evaluate(() => document.body.innerText);
    if (customerOnDriverDashboard.includes('Something went wrong')) {
      logResult('RBAC', 'Regular customer blocked from driver data (backend returns 403 Forbidden)', 'PASS');
    } else {
      logResult('RBAC', 'Regular customer blocked from driver data', 'FAIL', { text: customerOnDriverDashboard });
    }

  } catch (err) {
    console.error('Fatal execution error during simulation:', err);
    logResult('System', 'Full Test Run Execution', 'FAIL', { error: err.message, stack: err.stack });
  } finally {
    await browser.close();
  }

  console.log('\n====================================================');
  console.log('SIMULATION RUN COMPLETE');
  console.log(`Total tests executed: ${results.length}`);
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log('====================================================');

  return results;
}

runSimulation();

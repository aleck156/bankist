'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////

/**
 * Display all of user's movements on the left user panel
 * @param {Array} movement an array of all user's operations (moves)
 * @param {Boolean} sort  should the movements array be sorted?
 */
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  // creating a copy of movements, using .slice() method
  // [...movements] - would this work too?
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    // console.log(mov, i);
    const movType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// using .forEach()
// we do not want to create new array
// the goal is to modify the original source of data
// DEPENDENCY INJECTION ?!

/**
 * create username property on all accounts
 *
 * username are owners initials
 *
 * @param {Array} accounts an array of accounts, with owner property
 */
const createUserNames = function (accounts) {
  accounts.forEach((account, i) => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUserNames(accounts);

/**
 * Calculate account balance, log it to the console, and display it on the page
 *
 * add new property - balance - to an account that function is being called upon
 *
 * @param {Object} account  user's account, with movement, interestRate fields
 */
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  // console.log(`Account owner: ${account.owner} // Balance: ${accBalance}`);
  labelBalance.textContent = `${account.balance} €`;
};

/**
 * Update values of IN, OUT and INTEREST you see on the main page based on user's movements
 *
 * added rule 1: only interests that are above 1.00 € are to be calculated and included
 *
 * @param {Object} account  user's account, with movement, interestRate fields
 */
const calcDisplaySummary = function (account) {
  // console.log(account.movements);
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `${incomes} €`;

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(dep => dep > 1.0) // added rule 1
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest} €`;
};

/**
 * display movements, balance and summary for a given account
 * @param {Object} acc user account
 * @param {Boolean} sort  should the movements array be sorted?
 */
const updateUI = function (acc, sort) {
  // display movements
  displayMovements(acc.movements, sort);
  // display balance
  calcDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// EVENT HANDLERS
// this button is attached to a form, so the default action for html page is to reload it
// it's attached to a form, so pressing ENTER key also triggers sending that form to the server
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // the only way to prevent submitting a form and triggering page reload
  e.preventDefault();
  // creating artifacts ...
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log(`correct pin`);
    // display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    } ...`;

    containerApp.style.opacity = 1;

    updateUI(currentAccount);

    // clear login form fields once loged ing
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  } else {
    console.log(`wrong pin!`);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 && // transferring only positive amount of money
    receiverAcc &&
    amount <= currentAccount.balance && // can the sender afford to transfer that amount of money
    receiverAcc?.username !== currentAccount.username // disable sending money to the same acc
  ) {
    console.log(`Transfer valid`);
    console.log(
      `Transferring ${amount} from ${currentAccount.username} to ${receiverAcc.username}`
    );
    currentAccount.movements.push(amount * -1);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const confirmPin = Number(inputClosePin.value);
  const closingAccUsername = inputCloseUsername.value;

  if (
    currentAccount.username === closingAccUsername &&
    currentAccount.pin === confirmPin
  ) {
    const accIndex = accounts.findIndex(
      acc => acc.username === closingAccUsername
    );

    // delete account
    accIndex >= 0
      ? accounts.splice(accIndex, 1)
      : console.log('index not found?!');

    // hide UI
    containerApp.style.opacity = 0;

    // log out

    // resetting form fields
    inputClosePin.value = inputCloseUsername.value = '';
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  const minDepositRequired = loanAmount * 0.1;

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= minDepositRequired)
  ) {
    console.log(`You've qualified for the loan of ${loanAmount}`);
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
  } else {
    console.log(`You haven't met the requirements`);
  }

  inputLoanAmount.value = '';
});

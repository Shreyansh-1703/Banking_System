// Local state (The "Database")
let accounts = [];

// DOM Elements
const nameInput = document.getElementById('holder-name');
const balanceInput = document.getElementById('initial-balance');
const addBtn = document.getElementById('add-btn');
const accountList = document.getElementById('account-list');

// CREATE: Add an account
addBtn.addEventListener('click', () => {
    const name = nameInput.value;
    const balance = parseFloat(balanceInput.value);

    if (name && !isNaN(balance)) {
        const newAccount = { id: Date.now(), name, balance };
        accounts.push(newAccount);
        updateUI();
        clearInputs();
    } else {
        alert("Please enter valid details");
    }
});

// READ & UPDATE: Refresh the display
function updateUI() {
    accountList.innerHTML = '';

    accounts.forEach(acc => {
        const div = document.createElement('div');
        div.className = 'account-card';
        div.innerHTML = `
            <div>
                <strong>${acc.name}</strong><br>
                <span>Balance: $${acc.balance.toFixed(2)}</span>
            </div>
            <div>
                <button class="btn-update" onclick="deposit(${acc.id})">+$50</button>
                <button class="btn-delete" onclick="deleteAccount(${acc.id})">Close</button>
            </div>
        `;
        accountList.appendChild(div);
    });
}

// UPDATE: Add funds
window.deposit = (id) => {
    const account = accounts.find(a => a.id === id);
    if (account) {
        account.balance += 50;
        updateUI();
    }
};

// DELETE: Remove account
window.deleteAccount = (id) => {
    accounts = accounts.filter(a => a.id !== id);
    updateUI();
};

function clearInputs() {
    nameInput.value = '';
    balanceInput.value = '';
}
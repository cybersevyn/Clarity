// Toggle modal visibility with proper event listener management
function toggleModal(modalId, isVisible) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (isVisible) {
        modal.style.display = 'flex';
        // Remove any existing event listener first
        modal.removeEventListener('click', handleModalClick);
        // Add new event listener
        modal.addEventListener('click', handleModalClick);
        // Focus first input if exists
        const firstInput = modal.querySelector('input, textarea, select');
        if (firstInput) firstInput.focus();
    } else {
        modal.style.display = 'none';
    }
}

// Separate function for the click handler
function handleModalClick(event) {
    if (event.target === this) {
        toggleModal(this.id, false);
    }
}

// Safe localStorage operations
function safeGetFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
}

function safeSetToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error writing to localStorage:', error);
        return false;
    }
}

// Form reset functions
function resetIdeaForm() {
    document.getElementById('idea-title').value = '';
    document.getElementById('idea-category').value = 'work';
    document.getElementById('idea-priority').value = 'high';
    document.getElementById('idea-status').value = 'active';
    document.getElementById('idea-description').value = '';
}

function resetTransactionForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('transaction-type').value = 'income';
    document.getElementById('transaction-category').value = 'income';
    document.getElementById('transaction-date').value = '';
    document.getElementById('transaction-notes').value = '';
}

// Validation functions
function validateDate(date) {
    const inputDate = new Date(date);
    const today = new Date();
    return inputDate <= today;
}

function validateAmount(amount) {
    return !isNaN(amount) && amount > 0;
}

// Switch between tabs
function switchTab(tabName) {
    const sections = {
        'ideas': 'ideasSection',
        'transactions': 'transactionsSection'
    };
    
    const targetSection = sections[tabName];
    if (!targetSection) return;
    
    // Hide all sections
    Object.values(sections).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) section.style.display = 'none';
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected section and activate tab
    const section = document.getElementById(targetSection);
    const tab = document.getElementById(`${tabName}Tab`);
    
    if (section) section.style.display = 'block';
    if (tab) tab.classList.add('active');
    
    // Refresh the content
    if (tabName === 'ideas') {
        refreshIdeasTable();
    } else if (tabName === 'transactions') {
        refreshTransactionsTable();
    }
}

// Initialize data storage
function initializeStorage() {
    if (!localStorage.getItem('ideas')) {
        safeSetToStorage('ideas', [
            {
                id: 1,
                title: "App redesign for client project",
                category: "Work",
                status: "Active",
                created: "Mar 28, 2025",
                priority: "High"
            },
            {
                id: 2,
                title: "Create personal budget template",
                category: "Personal",
                status: "Completed",
                created: "Mar 24, 2025",
                priority: "Medium"
            },
            {
                id: 3,
                title: "Research investment options",
                category: "Finance",
                status: "Active",
                created: "Mar 22, 2025",
                priority: "High"
            },
            {
                id: 4,
                title: "Plan family vacation",
                category: "Personal",
                status: "Pending",
                created: "Mar 20, 2025",
                priority: "Medium"
            },
            {
                id: 5,
                title: "Website optimization project",
                category: "Work",
                status: "Active",
                created: "Mar 18, 2025",
                priority: "High"
            }
        ]);
    }
    
    if (!localStorage.getItem('transactions')) {
        safeSetToStorage('transactions', [
            {
                id: 1,
                description: "Freelance Design Project",
                category: "Income",
                amount: 1200.00,
                date: "Mar 30, 2025",
                type: "Deposit"
            },
            {
                id: 2,
                description: "Rent Payment",
                category: "Housing",
                amount: -850.00,
                date: "Mar 29, 2025",
                type: "Withdrawal"
            },
            {
                id: 3,
                description: "Grocery Shopping",
                category: "Food",
                amount: -124.35,
                date: "Mar 27, 2025",
                type: "Withdrawal"
            },
            {
                id: 4,
                description: "Client Payment",
                category: "Income",
                amount: 950.00,
                date: "Mar 25, 2025",
                type: "Deposit"
            },
            {
                id: 5,
                description: "Internet Bill",
                category: "Utilities",
                amount: -79.99,
                date: "Mar 24, 2025",
                type: "Withdrawal"
            }
        ]);
    }
}

// Add idea functionality with validation
function addIdea() {
    const title = document.getElementById('idea-title').value.trim();
    const category = document.getElementById('idea-category').value;
    const priority = document.getElementById('idea-priority').value;
    const status = document.getElementById('idea-status').value;
    const description = document.getElementById('idea-description').value.trim();
    
    if (!title) {
        showNotification('Please enter a title for your idea', 'error');
        return;
    }
    
    const ideas = safeGetFromStorage('ideas');
    const newId = ideas.length > 0 ? Math.max(...ideas.map(idea => idea.id)) + 1 : 1;
    
    const today = new Date();
    const formattedDate = `${today.toLocaleString('default', { month: 'short' })} ${today.getDate()}, ${today.getFullYear()}`;
    
    const newIdea = {
        id: newId,
        title: title,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        status: status.charAt(0).toUpperCase() + status.slice(1),
        created: formattedDate,
        priority: priority.charAt(0).toUpperCase() + priority.slice(1),
        description: description
    };
    
    ideas.push(newIdea);
    if (safeSetToStorage('ideas', ideas)) {
        refreshIdeasTable();
        toggleModal('newIdeaModal', false);
        resetIdeaForm();
        showNotification('Idea added successfully', 'success');
    } else {
        showNotification('Failed to save idea', 'error');
    }
}

// Add transaction functionality with validation
function addTransaction() {
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('transaction-type').value;
    const category = document.getElementById('transaction-category').value;
    const date = document.getElementById('transaction-date').value;
    const notes = document.getElementById('transaction-notes').value.trim();
    
    if (!description) {
        showNotification('Please enter a description', 'error');
        return;
    }
    
    if (!validateAmount(amount)) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    if (date && !validateDate(date)) {
        showNotification('Please enter a valid date', 'error');
        return;
    }
    
    const transactions = safeGetFromStorage('transactions');
    const newId = transactions.length > 0 ? Math.max(...transactions.map(transaction => transaction.id)) + 1 : 1;
    
    let formattedDate = date;
    if (date) {
        const dateObj = new Date(date);
        formattedDate = `${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    } else {
        const today = new Date();
        formattedDate = `${today.toLocaleString('default', { month: 'short' })} ${today.getDate()}, ${today.getFullYear()}`;
    }
    
    const finalAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);
    
    const newTransaction = {
        id: newId,
        description: description,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount: finalAmount,
        date: formattedDate,
        type: type === 'expense' ? 'Withdrawal' : 'Deposit',
        notes: notes
    };
    
    transactions.push(newTransaction);
    if (safeSetToStorage('transactions', transactions)) {
        refreshTransactionsTable();
        refreshDashboardStats();
        toggleModal('newTransactionModal', false);
        resetTransactionForm();
        showNotification('Transaction added successfully', 'success');
    } else {
        showNotification('Failed to save transaction', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger reflow
    notification.offsetHeight;
    
    // Add show class for animation
    notification.classList.add('show');
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const activeTab = document.querySelector('.tab.active').id;
        
        if (activeTab === 'ideasTab') {
            const ideas = safeGetFromStorage('ideas');
            const filteredIdeas = ideas.filter(idea => 
                idea.title.toLowerCase().includes(searchTerm) ||
                idea.category.toLowerCase().includes(searchTerm) ||
                idea.status.toLowerCase().includes(searchTerm)
            );
            updateIdeasTable(filteredIdeas);
        } else {
            const transactions = safeGetFromStorage('transactions');
            const filteredTransactions = transactions.filter(transaction =>
                transaction.description.toLowerCase().includes(searchTerm) ||
                transaction.category.toLowerCase().includes(searchTerm)
            );
            updateTransactionsTable(filteredTransactions);
        }
    });
}

// Refresh ideas table
function refreshIdeasTable() {
    const ideas = safeGetFromStorage('ideas');
    updateIdeasTable(ideas);
}

function updateIdeasTable(ideas) {
    const tbody = document.querySelector('#ideasSection table tbody');
    tbody.innerHTML = '';
    
    ideas.forEach(idea => {
        const row = document.createElement('tr');
        
        let statusClass = '';
        if (idea.status === 'Active') {
            statusClass = 'active';
        } else if (idea.status === 'Pending') {
            statusClass = 'pending';
        } else if (idea.status === 'Completed') {
            statusClass = 'completed';
        }
        
        row.innerHTML = `
            <td>${idea.title}</td>
            <td><span class="tag">${idea.category}</span></td>
            <td><span class="status ${statusClass}">${idea.status}</span></td>
            <td>${idea.created}</td>
            <td>${idea.priority}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Refresh transactions table
function refreshTransactionsTable() {
    const transactions = safeGetFromStorage('transactions');
    updateTransactionsTable(transactions);
}

function updateTransactionsTable(transactions) {
    const tbody = document.querySelector('#transactionsSection table tbody');
    tbody.innerHTML = '';
    
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        const amountClass = transaction.amount >= 0 ? 'positive' : 'negative';
        const formattedAmount = transaction.amount >= 0 ? 
            `+$${Math.abs(transaction.amount).toFixed(2)}` : 
            `-$${Math.abs(transaction.amount).toFixed(2)}`;
        
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td><span class="tag">${transaction.category}</span></td>
            <td class="amount ${amountClass}">${formattedAmount}</td>
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Refresh dashboard statistics
function refreshDashboardStats() {
    const transactions = safeGetFromStorage('transactions');
    
    // Calculate total balance
    const totalBalance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.querySelector('.card:nth-child(1) .card-value').textContent = `$${totalBalance.toFixed(2)}`;
    
    // Calculate income for current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const income = transactions.filter(t => {
        const date = new Date(t.date);
        return t.amount > 0 && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).reduce((sum, t) => sum + t.amount, 0);
    
    document.querySelector('.card:nth-child(2) .card-value').textContent = `$${income.toFixed(2)}`;
    
    // Calculate expenses for current month
    const expenses = transactions.filter(t => {
        const date = new Date(t.date);
        return t.amount < 0 && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    document.querySelector('.card:nth-child(3) .card-value').textContent = `$${expenses.toFixed(2)}`;
    
    // Count active ideas
    const ideas = safeGetFromStorage('ideas');
    const activeIdeas = ideas.filter(idea => idea.status === 'Active').length;
    
    document.querySelector('.card:nth-child(4) .card-value').textContent = activeIdeas.toString();
}

// Navigation functionality
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = {
        'Dashboard': 'dashboardSection',
        'Ideas': 'ideasSection',
        'Finances': 'transactionsSection',
        'Notes': 'notesSection',
        'Work': 'workSection',
        'Personal': 'personalSection',
        'Health': 'healthSection',
        'Pending': 'pendingSection'
    };

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');

            // Get the section name from the nav item text
            const sectionName = this.textContent.trim();
            const targetSection = sections[sectionName];

            if (targetSection) {
                // Hide all sections first
                Object.values(sections).forEach(sectionId => {
                    const section = document.getElementById(sectionId);
                    if (section) section.style.display = 'none';
                });

                // Show the target section
                const section = document.getElementById(targetSection);
                if (section) {
                    section.style.display = 'block';
                    // Update the header title
                    document.querySelector('.header h1').textContent = sectionName;
                }

                // Refresh content based on section
                switch(sectionName) {
                    case 'Dashboard':
                        refreshDashboardStats();
                        break;
                    case 'Ideas':
                        refreshIdeasTable();
                        break;
                    case 'Finances':
                        refreshTransactionsTable();
                        break;
                    // Add other section refreshes as needed
                }
            }
        });
    });
}

// Setup dashboard card interactions
function setupDashboardCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('.card-title').textContent.toLowerCase();
            
            // Handle different card types
            switch(cardTitle) {
                case 'balance':
                    switchTab('transactions');
                    break;
                case 'income':
                    toggleModal('newTransactionModal', true);
                    document.getElementById('transaction-type').value = 'income';
                    break;
                case 'expenses':
                    toggleModal('newTransactionModal', true);
                    document.getElementById('transaction-type').value = 'expense';
                    break;
                case 'ideas':
                    switchTab('ideas');
                    break;
            }
        });
    });
}

// Improved mobile navigation
function setupMobileNavigation() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (menuButton && sidebar) {
        menuButton.addEventListener('click', function() {
            sidebar.classList.toggle('show');
            document.body.style.overflow = sidebar.classList.contains('show') ? 'hidden' : '';
        });
        
        // Close sidebar when clicking outside
        mainContent.addEventListener('click', function(e) {
            if (sidebar.classList.contains('show') && !e.target.closest('.sidebar')) {
                sidebar.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
}

// Initialize all event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeStorage();
    setupEventListeners();
    setupNavigation();
    setupDashboardCards();
    setupMobileNavigation();
    refreshDashboardStats();
    refreshIdeasTable();
    refreshTransactionsTable();
    setupSearch();
});

// Setup all event listeners
function setupEventListeners() {
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.closest('.modal').id;
            toggleModal(modalId, false);
        });
    });

    // Add New buttons
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-target');
            toggleModal(modalId, true);
        });
    });

    // Form submissions
    document.getElementById('newIdeaForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addIdea();
    });

    document.getElementById('newTransactionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addTransaction();
    });

    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.id.replace('Tab', '').toLowerCase();
            switchTab(tabName);
        });
    });
} 
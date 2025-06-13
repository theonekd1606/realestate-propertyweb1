document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the my-account page before running any logic
    if (window.location.pathname.endsWith('my-account.html')) {
        
        // --- DOM Elements ---
        const authSection = document.getElementById('auth-section');
        const accountSection = document.getElementById('account-section');
        
        const loginContainer = document.getElementById('login-container');
        const signupContainer = document.getElementById('signup-container');
        
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

        const showSignupBtn = document.getElementById('show-signup');
        const showLoginBtn = document.getElementById('show-login');

        const loginError = document.getElementById('login-error');
        const signupError = document.getElementById('signup-error');

        const logoutBtn = document.getElementById('logout-btn');
        const userEmailSpan = document.getElementById('user-email');
        
        const addPropertyForm = document.getElementById('add-property-form');
        const myPropertiesList = document.getElementById('my-properties-list');

        // --- Data Management ---
        // Get users object from localStorage, or initialize an empty object
        const getUsers = () => JSON.parse(localStorage.getItem('realEstateUsers')) || {};
        const saveUsers = (users) => localStorage.setItem('realEstateUsers', JSON.stringify(users));

        // --- UI Toggling ---
        const showLoginPage = () => {
            signupContainer.classList.add('hidden');
            loginContainer.classList.remove('hidden');
        };

        const showSignupPage = () => {
            loginContainer.classList.add('hidden');
            signupContainer.classList.remove('hidden');
        };
        
        const showAccountPage = (email) => {
            authSection.classList.add('hidden');
            accountSection.classList.remove('hidden');
            userEmailSpan.textContent = email;
            displayUserProperties(email);
        };

        const showAuthPage = () => {
            accountSection.classList.add('hidden');
            authSection.classList.remove('hidden');
            showLoginPage();
        };

        // --- Core Logic ---
        const checkLoginStatus = () => {
            const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
            if (loggedInUserEmail) {
                showAccountPage(loggedInUserEmail);
            } else {
                showAuthPage();
            }
        };

        const displayUserProperties = (email) => {
            const users = getUsers();
            const userProperties = users[email]?.properties || [];
            
            myPropertiesList.innerHTML = ''; // Clear the list
            if (userProperties.length === 0) {
                myPropertiesList.innerHTML = '<p class="text-gray-500 col-span-full text-center">You have not listed any properties yet. Add one below!</p>';
                return;
            }

            userProperties.forEach(prop => {
                const propertyCard = `
                    <div class="property-card bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105">
                      <img src="https://placehold.co/400x250/3b82f6/ffffff?text=My+Property" alt="Property" class="w-full h-40 object-cover rounded-md mb-4" />
                      <h3 class="mt-2 font-semibold text-lg text-gray-800">${prop.price}</h3>
                      <p class="text-gray-600 text-sm">${prop.description}<br>${prop.location}</p>
                    </div>
                `;
                myPropertiesList.innerHTML += propertyCard;
            });
        };

        // --- Event Listeners ---
        showSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showSignupPage();
        });

        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginPage();
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            signupError.classList.add('hidden');
            const email = e.target['signup-email'].value;
            const password = e.target['signup-password'].value;
            const users = getUsers();

            if (users[email]) {
                signupError.classList.remove('hidden');
                return;
            }

            users[email] = { password: password, properties: [] };
            saveUsers(users);
            
            sessionStorage.setItem('loggedInUser', email);
            checkLoginStatus();
            signupForm.reset();
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loginError.classList.add('hidden');
            const email = e.target['login-email'].value;
            const password = e.target['login-password'].value;
            const users = getUsers();

            if (users[email] && users[email].password === password) {
                sessionStorage.setItem('loggedInUser', email);
                checkLoginStatus();
                loginForm.reset();
            } else {
                loginError.classList.remove('hidden');
            }
        });

        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser');
            checkLoginStatus();
        });

        addPropertyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
            if (!loggedInUserEmail) return;

            const newProperty = {
                description: e.target['property-description'].value,
                price: e.target['property-price'].value,
                location: e.target['property-location'].value,
            };
            
            const users = getUsers();
            users[loggedInUserEmail].properties.push(newProperty);
            saveUsers(users);
            
            displayUserProperties(loggedInUserEmail);
            addPropertyForm.reset();
        });

        // --- Initial Load ---
        checkLoginStatus();
    }
});

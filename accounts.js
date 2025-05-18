// java/accounts.js

document.addEventListener('DOMContentLoaded', () => {
  // —— LOGIN/SIGNUP & NAV ——
  const loginForm  = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const rememberMe = document.getElementById('remember-me');

  // Pre-fill saved credentials
  if (loginForm && rememberMe) {
    const savedEmail    = localStorage.getItem('pawsclaws_email');
    const savedPassword = localStorage.getItem('pawsclaws_password');
    if (savedEmail && savedPassword) {
      document.getElementById('login-email').value    = savedEmail;
      document.getElementById('login-password').value = savedPassword;
      rememberMe.checked = true;
    }
  }

  // Submit handlers
  if (loginForm)  loginForm.addEventListener('submit', e => { e.preventDefault(); handleLogin(); });
  if (signupForm) signupForm.addEventListener('submit', e => { e.preventDefault(); handleSignup(); });

  // Social login simulation
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const provider = btn.classList.contains('google') ? 'google'
                     : btn.classList.contains('apple')  ? 'apple'
                     : 'facebook';
      handleSocialLogin(provider);
    });
  });

  // Initial auth nav
  updateAuthNav();

  // Sidebar & logout only on account page
  if (document.getElementById('sidebar-username')) {
    const user = JSON.parse(sessionStorage.getItem('pawsclaws_current_user'));
    if (!user) return window.location.href = 'login.html';
    loadSidebar(user);
    const logoutBtn = document.getElementById('sidebar-logout');
    logoutBtn?.addEventListener('click', () => logout());
    initProfileEditor(user);
  }
});


// ——— LOGIN —————————————————————————————————————
function handleLogin() {
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const remember = document.getElementById('remember-me')?.checked;

  if (!email || !password) {
    return showError('Please fill in all fields');
  }

  const users = JSON.parse(localStorage.getItem('pawsclaws_users')) || [];
  const user  = users.find(u => u.email === email && u.password === password);
  if (!user) return showError('Invalid email or password');

  if (!user.profilePic) {
    user.profilePic = 'images/default-profile.png';
    localStorage.setItem('pawsclaws_users', JSON.stringify(users));
  }

  sessionStorage.setItem('pawsclaws_current_user', JSON.stringify(user));
  if (remember) {
    localStorage.setItem('pawsclaws_email', email);
    localStorage.setItem('pawsclaws_password', password);
  } else {
    localStorage.removeItem('pawsclaws_email');
    localStorage.removeItem('pawsclaws_password');
  }

  updateAuthNav();
  window.location.href = 'index.html';
}


// ——— SIGNUP ————————————————————————————————————
function handleSignup() {
  const fname   = document.getElementById('signup-fname').value.trim();
  const lname   = document.getElementById('signup-lname').value.trim();
  const email   = document.getElementById('signup-email').value.trim();
  const password= document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;

  if (!fname || !lname || !email || !password || !confirm) {
    return showError('Please fill in all fields');
  }
  if (password !== confirm) {
    return showError('Passwords do not match');
  }
  if (password.length < 8) {
    return showError('Password must be at least 8 characters');
  }

  const users = JSON.parse(localStorage.getItem('pawsclaws_users')) || [];
  if (users.some(u => u.email === email)) {
    return showError('Email already registered');
  }

  const newUser = {
    id:         Date.now().toString(),
    fname, lname, email, password,
    profilePic: 'images/default-profile.png',
    createdAt:  new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('pawsclaws_users', JSON.stringify(users));
  sessionStorage.setItem('pawsclaws_current_user', JSON.stringify(newUser));

  updateAuthNav();
  window.location.href = 'index.html';
}


// ——— SOCIAL LOGIN —————————————————————————————
function handleSocialLogin(provider) {
  const socialUser = {
    id:         `social_${Date.now()}`,
    fname:      'Social',
    lname:      'User',
    email:      `${provider}@example.com`,
    provider,
    profilePic: 'images/default-profile.png',
    createdAt:  new Date().toISOString()
  };
  sessionStorage.setItem('pawsclaws_current_user', JSON.stringify(socialUser));
  alert(`Successfully logged in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`);
  updateAuthNav();
  window.location.href = 'index.html';
}


// ——— AUTH NAV ————————————————————————————————————
function updateAuthNav() {
  const authNav = document.getElementById('auth-nav-item');
  if (!authNav) return;
  const user = JSON.parse(sessionStorage.getItem('pawsclaws_current_user'));

  authNav.innerHTML = user
    ? `<a href="account.html" class="hover profile-nav">
         <img src="${user.profilePic}" width="25" class="profile-pic-nav" alt="Profile">
       </a>`
    : `<a href="login.html" class="hover">
         <img src="images/login.png" width="25" alt="Login">
       </a>`;
}


// ——— LOGOUT ————————————————————————————————————
function logout() {
  sessionStorage.removeItem('pawsclaws_current_user');
  updateAuthNav();
  window.location.href = 'login.html';
}


// ——— ERROR HANDLING —————————————————————————
function showError(message) {
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  const activeForm = document.querySelector('form#loginForm, form#signupForm');
  if (!activeForm) return alert(message);

  const errorEl = document.createElement('div');
  errorEl.className = 'error-message';
  errorEl.textContent = message;
  const submitBtn = activeForm.querySelector('button[type="submit"]');
  submitBtn.before(errorEl);

  setTimeout(() => errorEl.remove(), 5000);
}


// ——— SIDEBAR + PROFILE EDITOR ————————————————————
function loadSidebar(user) {
  document.getElementById('sidebar-avatar').src = user.profilePic || 'images/default-profile.png';
  document.getElementById('sidebar-username').textContent =
    `${user.fname}_${user.lname.charAt(0).toLowerCase()}`;
}

function initProfileEditor(user) {
  // Elements
  const form           = document.getElementById('profile-form');
  const unameEl        = document.getElementById('profile-username');
  const nameInput      = document.getElementById('name');
  const emailDisplay   = document.getElementById('email-display');
  const emailInput     = document.getElementById('email-input');
  const phoneDisplay   = document.getElementById('phone-display');
  const phoneInput     = document.getElementById('phone-input');
  const dobInput       = document.getElementById('dob');
  const saveBtn        = document.getElementById('save-btn');
  const editSidebarBtn = document.querySelector('.edit-profile');
  const changeEmailBtn = document.getElementById('change-email');
  const changePhoneBtn = document.getElementById('change-phone');

  // PREFILL
  unameEl.textContent      = `Username: ${user.fname}_${user.lname.charAt(0).toLowerCase()}`;
  nameInput.value          = `${user.fname} ${user.lname}`;
  emailDisplay.textContent = user.email || '';
  emailInput.value         = user.email || '';
  phoneDisplay.textContent = user.phone || '';
  phoneInput.value         = user.phone || '';
  dobInput.value           = user.dob || '';
  if (user.gender) {
    const g = form.querySelector(`input[name="gender"][value="${user.gender}"]`);
    if (g) g.checked = true;
  }

  // EDIT MODE TOGGLE
  function enterEditMode() {
    document.querySelector('.Profile-content').classList.add('edit-mode');
    saveBtn.style.display = 'inline-block';
    form.querySelectorAll('input').forEach(i => i.disabled = false);
  }

  
  function exitEditMode() {
    document.querySelector('.Profile-content').classList.remove('edit-mode');
    saveBtn.style.display = 'none';
    form.querySelectorAll('input').forEach(i => i.disabled = true);
  }

  // Handlers
  editSidebarBtn.addEventListener('click', e => {
    e.preventDefault();
    enterEditMode();
    nameInput.focus();
  });
  changeEmailBtn.addEventListener('click', e => {
    e.preventDefault();
    enterEditMode();
    emailInput.focus();
  });
  changePhoneBtn.addEventListener('click', e => {
    e.preventDefault();
    enterEditMode();
    phoneInput.focus();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    // NEW VALUES
    const [newF, newL] = nameInput.value.trim().split(' ');
    const newEmail     = emailInput.value.trim();
    const newPhone     = phoneInput.value.trim();
    const newGender    = form.querySelector('input[name="gender"]:checked')?.value || '';
    const newDob       = dobInput.value;

    // DUPLICATE CHECK
    const users = JSON.parse(localStorage.getItem('pawsclaws_users')) || [];
    if (users.some(u => u.email === newEmail && u.id !== user.id)) {
      return alert('That email is already in use by another account.');
    }
    if (newPhone && users.some(u => u.phone === newPhone && u.id !== user.id)) {
      return alert('That phone number is already in use by another account.');
    }

    // APPLY CHANGES
    user.fname  = newF || user.fname;
    user.lname  = newL || user.lname;
    user.email  = newEmail;
    user.phone  = newPhone;
    user.gender = newGender;
    user.dob    = newDob;

    sessionStorage.setItem('pawsclaws_current_user', JSON.stringify(user));
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = user;
      localStorage.setItem('pawsclaws_users', JSON.stringify(users));
    }

    // REFRESH UI
    unameEl.textContent      = `Username: ${user.fname}_${user.lname.charAt(0).toLowerCase()}`;
    emailDisplay.textContent = newEmail;
    phoneDisplay.textContent = newPhone;

    alert('Profile updated successfully.');
    exitEditMode();
  });

  const picInput   = document.getElementById('profile-pic-input');
const picPreview = document.getElementById('profile-pic-preview');

picPreview.src = user.profilePic || 'images/default-profile.png';

picInput.addEventListener('change', () => {
  const file = picInput.files[0];
  if (!file) return;

  if (!['image/jpeg','image/png'].includes(file.type)) {
    return alert('Please upload a JPG or PNG image.');
  }
  if (file.size > 1_048_576) {
    return alert('File too large: must be 1 MB or less.');
  }

  const reader = new FileReader();
  reader.onload = () => showCropperModal(reader.result);
  reader.readAsDataURL(file);
});
function showCropperModal(srcUrl) {
  const modal      = document.getElementById('cropper-modal');
  const srcImg     = document.getElementById('crop-source');
  const btnConfirm = document.getElementById('crop-confirm');
  const btnCancel  = document.getElementById('crop-cancel');
  modal.classList.remove('hidden');
  srcImg.src = srcUrl;

  const cropper = new Cropper(srcImg, { aspectRatio: 1, viewMode: 1 });

  btnConfirm.onclick = () => {
    const square = cropper.getCroppedCanvas({ width: 200, height: 200 });
    const circ = document.createElement('canvas');
    circ.width = circ.height = 200;
    const ctx = circ.getContext('2d');
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(square, 0, 0, 200, 200);
    const clipped = circ.toDataURL('image/png');

    user.profilePic = clipped;
    sessionStorage.setItem('pawsclaws_current_user', JSON.stringify(user));
    const users = JSON.parse(localStorage.getItem('pawsclaws_users')) || [];
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx].profilePic = clipped;
      localStorage.setItem('pawsclaws_users', JSON.stringify(users));
    }

    document.getElementById('sidebar-avatar').src = clipped;
    picPreview.src = clipped;
    const navImg = document.querySelector('.profile-pic-nav');
    if (navImg) navImg.src = clipped;

    cropper.destroy();
    modal.classList.add('hidden');
    alert('Profile photo updated!');
  };

  btnCancel.onclick = () => {
    cropper.destroy();
    modal.classList.add('hidden');
  };
}
const cartLink = document.querySelector('a[href="Cart.html"]');
if (cartLink) {
  cartLink.addEventListener('click', e => {
    const user = sessionStorage.getItem('pawsclaws_current_user');
    if (!user) {
      e.preventDefault();
      // send them to login, preserving the “next” param
      window.location.href = 'login.html?next=Cart.html';
    }
  });
}
}


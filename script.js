/* ============================================
   SCRIPT.JS — Portfolio Interactive Features
   ============================================ */

// ========== MOBILE HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mainNav.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mainNav.classList.remove('open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!mainNav.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            mainNav.classList.remove('open');
        }
    });
}

// ========== HIRE ME MODAL ==========
const hireMeBtn = document.getElementById('hireMeBtn');
const hireModal = document.getElementById('hireModal');
const modalClose = document.getElementById('modalClose');

function openModal() {
    if (hireModal) {
        hireModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (hireModal) {
        hireModal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

if (hireMeBtn) {
    hireMeBtn.addEventListener('click', openModal);
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking overlay (outside modal box)
if (hireModal) {
    hireModal.addEventListener('click', function (e) {
        if (e.target === hireModal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ========== CONTACT FORM VALIDATION ==========
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        // Get field values
        var fullName = document.getElementById('fullName').value.trim();
        var email = document.getElementById('email').value.trim();
        var subject = document.getElementById('subject').value.trim();
        var message = document.getElementById('message').value.trim();

        var isValid = true;

        // Validate Full Name
        if (fullName === '') {
            showError('fullName', 'nameError', 'Please enter your full name.');
            isValid = false;
        } else if (fullName.length < 2) {
            showError('fullName', 'nameError', 'Name must be at least 2 characters.');
            isValid = false;
        }

        // Validate Email
        if (email === '') {
            showError('email', 'emailError', 'Please enter your email address.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'emailError', 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate Subject
        if (subject === '') {
            showError('subject', 'subjectError', 'Please enter a subject.');
            isValid = false;
        }

        // Validate Message
        if (message === '') {
            showError('message', 'messageError', 'Please enter your message.');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'messageError', 'Message must be at least 10 characters.');
            isValid = false;
        }

        // If all valid, show success
        if (isValid) {
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
        }
    });

    // Real-time: remove error when user starts typing
    var formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(function (input) {
        input.addEventListener('input', function () {
            this.classList.remove('input-error');
            var errorId = this.id === 'fullName' ? 'nameError'
                        : this.id === 'email' ? 'emailError'
                        : this.id === 'subject' ? 'subjectError'
                        : this.id === 'message' ? 'messageError'
                        : null;
            if (errorId) {
                document.getElementById(errorId).textContent = '';
            }
        });
    });
}

function showError(inputId, errorId, message) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    if (input) input.classList.add('input-error');
    if (error) error.textContent = message;
}

function clearErrors() {
    var errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (el) {
        el.textContent = '';
    });
    var errorInputs = document.querySelectorAll('.input-error');
    errorInputs.forEach(function (el) {
        el.classList.remove('input-error');
    });
}

function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========== HEADER SCROLL SHADOW ==========
window.addEventListener('scroll', function () {
    var header = document.querySelector('.site-header');
    if (header) {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
    }
});

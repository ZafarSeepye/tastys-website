// ==========================================================================
// Tasty's Take Aways - main JavaScript entry point
// Styles and every feature get imported from here in later steps.
// ==========================================================================

import './styles/main.css';

const status = document.getElementById('js-status');

if (status) {
  status.textContent = 'JavaScript: loaded ✔';
  status.classList.add('is-ok');
}

console.log("Tasty's website: loaded");

/* ==========================================================================
   Tasty's Take Aways - "Open now / Closed" badges
   Works out the status from the hours in src/data/business.js, using
   South African time, and refreshes every minute.
   - Any element with [data-open-status] becomes a badge
   - Any hours row with [data-days="1,2,3"] is highlighted when it's today
   ========================================================================== */

import { business } from '../data/business.js';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** "09:30" -> 570 (minutes after midnight) */
const toMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

/** Current day (0-6) and minutes after midnight in South Africa */
function nowInShop() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: business.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());

  const get = (type) => parts.find((p) => p.type === type).value;
  return { day: WEEKDAY_INDEX[get('weekday')], minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

/** Returns { state: 'open' | 'soon' | 'closed', label, detail } */
export function getOpenStatus() {
  const { day, minutes } = nowInShop();
  const today = business.hours[day];

  if (today) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);

    if (minutes >= open && minutes < close) {
      if (close - minutes <= business.closingSoonMinutes) {
        return { state: 'soon', label: 'Closing soon', detail: `until ${today.close}` };
      }
      return { state: 'open', label: 'Open now', detail: `until ${today.close}` };
    }

    if (minutes < open) {
      return { state: 'closed', label: 'Closed', detail: `opens today ${today.open}` };
    }
  }

  // Closed for the rest of today: find the next day we open
  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    const hours = business.hours[next];
    if (hours) {
      const when = i === 1 ? 'tomorrow' : DAY_NAMES[next];
      return { state: 'closed', label: 'Closed', detail: `opens ${when} ${hours.open}` };
    }
  }

  return { state: 'closed', label: 'Closed', detail: '' };
}

function update() {
  const status = getOpenStatus();
  const { day } = nowInShop();

  document.querySelectorAll('[data-open-status]').forEach((badge) => {
    badge.classList.remove('is-open', 'is-soon', 'is-closed');
    badge.classList.add(`is-${status.state}`);

    // Built with textContent (not HTML strings), so nothing in the data can inject code
    const dot = document.createElement('span');
    dot.className = 'open-badge__dot';
    dot.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.className = 'open-badge__label';
    label.textContent = status.label;

    badge.replaceChildren(dot, label);

    if (status.detail) {
      const detail = document.createElement('span');
      detail.className = 'open-badge__detail';
      detail.textContent = `· ${status.detail}`;
      badge.append(detail);
    }
    badge.hidden = false;
  });

  document.querySelectorAll('[data-days]').forEach((row) => {
    const days = row.dataset.days.split(',').map(Number);
    const isToday = days.includes(day);
    row.classList.toggle('is-today', isToday);
    if (isToday) row.setAttribute('aria-current', 'date');
    else row.removeAttribute('aria-current');
  });
}

export function initOpenStatus() {
  update();
  setInterval(update, 60 * 1000);
}

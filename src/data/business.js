/* ==========================================================================
   Tasty's Take Aways - Business details
   Opening hours live here. The "Open now / Closed" badges and the
   highlighted day in "Find us" are worked out from these hours.
   ========================================================================== */

export const business = {
  name: "Tasty's Take Aways",
  timeZone: 'Africa/Johannesburg', // always uses South African time, wherever the visitor is
  closingSoonMinutes: 30, // show "Closing soon" this many minutes before closing

  // 0 = Sunday, 1 = Monday ... 6 = Saturday. null = closed that day.
  hours: {
    0: null,
    1: { open: '09:00', close: '17:00' },
    2: { open: '09:00', close: '17:00' },
    3: { open: '09:00', close: '17:00' },
    4: { open: '09:00', close: '17:00' },
    5: { open: '09:00', close: '17:00' },
    6: { open: '09:00', close: '15:00' },
  },
};

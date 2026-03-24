export const residents = [
  { id: '101', name: 'Alice Smith', house: 'A1', charge: 1200, balance: 0, status: 'Paid', email: 'alice.smith@example.com' },
  { id: '102', name: 'Bob Jones', house: 'A2', charge: 1200, balance: 1800, status: 'Overdue', email: 'bob.jones@example.com' },
  { id: '103', name: 'Charlie Brown', house: 'B1', charge: 1500, balance: 500, status: 'Partial', email: 'charlie.brown@example.com' },
  { id: '104', name: 'Diana Prince', house: 'B2', charge: 1500, balance: 0, status: 'Paid', email: 'diana.prince@example.com' },
  { id: '105', name: 'Evan Wright', house: 'C1', charge: 1000, balance: 2000, status: 'Overdue', email: 'evan.wright@example.com' },
];

export const ledgerData = {
  '102': [
    { id: 1, date: 'Mar 01, 2026', type: 'Charge', description: 'March Rent', amount: 1200, paid: 0, balance: 1200, status: 'Overdue' },
    { id: 2, date: 'Feb 05, 2026', type: 'Payment', description: 'Bank Transfer', amount: -600, paid: null, balance: null, status: 'Completed' },
    { id: 3, date: 'Feb 01, 2026', type: 'Charge', description: 'February Rent', amount: 1200, paid: 600, balance: 600, status: 'Partial' },
    { id: 4, date: 'Jan 05, 2026', type: 'Payment', description: 'Bank Transfer', amount: -1200, paid: null, balance: null, status: 'Completed' },
    { id: 5, date: 'Jan 01, 2026', type: 'Charge', description: 'January Rent', amount: 1200, paid: 1200, balance: 0, status: 'Paid' },
  ],
  // Add more as needed...
};

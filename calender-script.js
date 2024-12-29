// Select elements
const dateRangeDisplay = document.getElementById('date-range-display');
const calendarDays = document.getElementById('calendar-days');
const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');

// Helper to format date
function formatDate(date) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(',', '');
}

// Function to generate a week's dates
function generateWeek(startDate) {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        days.push(day);
    }
    return days;
}

// Render the calendar UI
function renderCalendar(startDate) {
    const week = generateWeek(startDate);
    const firstDay = week[0];
    const lastDay = week[6];

    // Update date range display
    dateRangeDisplay.textContent = `${formatDate(firstDay)} – ${formatDate(lastDay)}`;

    // Clear previous days
    calendarDays.innerHTML = '';

    // Populate the week days
    week.forEach((day) => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.textContent = `${day.toDateString().slice(0, 3)} ${day.getDate()}`;
        calendarDays.appendChild(dayDiv);
    });
}

// Get the current week's start date (Monday)
function getWeekStart(date) {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Adjust if Sunday
    const start = new Date(date);
    start.setDate(date.getDate() + diff);
    return start;
}

// Initialize calendar with the current week
let currentStartDate = getWeekStart(new Date());
renderCalendar(currentStartDate);

// Navigate to previous or next week
prevWeekBtn.addEventListener('click', () => {
    currentStartDate.setDate(currentStartDate.getDate() - 7);
    renderCalendar(currentStartDate);
});

nextWeekBtn.addEventListener('click', () => {
    currentStartDate.setDate(currentStartDate.getDate() + 7);
    renderCalendar(currentStartDate);
});

// Go to today's week
todayBtn.addEventListener('click', () => {
    currentStartDate = getWeekStart(new Date());
    renderCalendar(currentStartDate);
});

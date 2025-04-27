// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav a');
const statValues = {
    'potential-cases': 87,
    'amount-recovered': '$12.7M',
    'intl-requests': 23,
    'detection-rate': '78%'
};

// Sample alerts data
const alerts = [
    {
        title: "High-value offshore transfer detected",
        description: "Taxpayer ID 45782 transferred $1.2M to Mauritius",
        status: "critical",
        date: "Today, 09:45"
    },
    {
        title: "Potential undisclosed foreign account",
        description: "Taxpayer ID 32945 has possible undisclosed Swiss account",
        status: "warning",
        date: "Yesterday, 14:30"
    },
    {
        title: "Foreign property ownership mismatch",
        description: "Taxpayer ID 78231 declared no foreign properties but found UK residence",
        status: "warning",
        date: "2 days ago"
    },
    {
        title: "Case resolved - funds recovered",
        description: "$450,000 recovered from taxpayer ID 12938",
        status: "resolved",
        date: "1 week ago"
    }
];

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Update stat values with animation
    for (const [id, value] of Object.entries(statValues)) {
        animateValue(id, 0, value, 1000);
    }
    
    // Render alerts
    renderAlerts();
    
    // Initialize chart
    initTrendsChart();
    
    // Set up navigation
    setupNavigation();
});

// Animate stat counter
function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(function() {
        current += increment;
        element.textContent = typeof end === 'string' ? end : current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Render alerts list
function renderAlerts() {
    const alertList = document.getElementById('alert-list');
    if (!alertList) return;
    
    alertList.innerHTML = alerts.map(alert => `
        <div class="alert-item ${alert.status === 'critical' ? 'critical' : ''} ${alert.status === 'resolved' ? 'resolved' : ''}">
            <div class="alert-content">
                <h4>${alert.title}</h4>
                <p>${alert.description} • ${alert.date}</p>
            </div>
            <span class="alert-badge ${alert.status === 'critical' ? 'badge-critical' : 'badge-warning'}">
                ${alert.status === 'resolved' ? 'Resolved' : alert.status === 'critical' ? 'Critical' : 'Warning'}
            </span>
        </div>
    `).join('');
}

// Initialize trends chart
function initTrendsChart() {
    const ctx = document.getElementById('trends-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Cases Detected',
                data: [12, 19, 15, 27, 24, 18, 22, 31, 28, 35, 42, 39],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.3,
                fill: true
            }, {
                label: 'Amount Recovered ($M)',
                data: [0.8, 1.2, 0.9, 1.5, 1.8, 1.2, 1.6, 2.1, 2.4, 2.9, 3.2, 2.7],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Set up navigation between sections
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (!targetSection) return;
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            targetSection.classList.add('active');
        });
    });
}
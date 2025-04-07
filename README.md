# Clarity - Modern Tracking System

A modern, responsive web application for tracking ideas, finances, and personal tasks. Built with vanilla JavaScript and CSS, featuring a clean and intuitive user interface.

## Features

### Dashboard
- Overview of key metrics
- Interactive cards showing:
  - Current balance
  - Monthly income
  - Monthly expenses
  - Active ideas count

### Ideas Management
- Create and track ideas
- Categorize ideas (Work, Personal, Finance, etc.)
- Set priority levels (High, Medium, Low)
- Track status (Active, Pending, Completed)
- Click on ideas to view full details
- Delete unwanted ideas
- Search and filter ideas

### Financial Tracking
- Track income and expenses
- Categorize transactions
- View transaction history
- Monitor monthly financial trends
- Search and filter transactions

### User Interface
- Clean, modern design
- Responsive layout (mobile-friendly)
- Dark/light mode support
- Interactive notifications
- Smooth animations and transitions
- Mobile sidebar navigation

## Technical Details

### Storage
- Uses browser's localStorage for data persistence
- Automatic data initialization on first load
- Safe storage operations with error handling

### Components
1. **Navigation**
   - Sidebar navigation with categories
   - Mobile-responsive menu
   - Active state tracking

2. **Modals**
   - Add new ideas
   - Add new transactions
   - View idea details
   - Delete confirmation

3. **Tables**
   - Sortable columns
   - Status indicators
   - Interactive rows
   - Responsive design

4. **Search**
   - Real-time filtering
   - Multi-section search
   - Case-insensitive matching

### CSS Features
- CSS Variables for theming
- Flexbox and Grid layouts
- Responsive breakpoints
- Interactive animations
- Status indicators and badges

## Usage

### Adding Ideas
1. Click "Add Idea" button
2. Fill in the idea details:
   - Title
   - Category
   - Priority
   - Status
   - Description
3. Submit the form

### Managing Ideas
- Click on any idea row to view details
- Use the delete button in the details view to remove ideas
- Search ideas using the search bar
- Filter by category using the sidebar

### Financial Tracking
1. Click "Add Transaction" button
2. Enter transaction details:
   - Description
   - Amount
   - Category
   - Type (Income/Expense)
   - Date
3. View transaction history in the Finances tab

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Open index.html in your web browser

No additional setup required as the application runs entirely in the browser.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by Feather Icons
- Font system by system-ui
- Color scheme inspired by Tailwind CSS 
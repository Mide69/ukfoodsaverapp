# FoodSaver App - Figma UI/UX Design Guide

## 🎨 Design System

### **Color Palette**
```
Primary Colors:
- Forest Green: #2E7D32 (Main brand color)
- Amber Orange: #FF8F00 (Accent/CTA buttons)
- Success Green: #4CAF50 (Success states)

Secondary Colors:
- Light Green: #81C784 (Backgrounds)
- Warm Orange: #FFB74D (Secondary actions)
- Error Red: #F44336 (Error states)

Neutral Colors:
- Text Primary: #1B5E20 (Dark green for text)
- Text Secondary: #666666 (Gray for secondary text)
- Background: #F8FDF8 (Light green tint)
- Surface: #FFFFFF (Cards and surfaces)
- Border: #E0E0E0 (Borders and dividers)
```

### **Typography**
```
Primary Font: Poppins (Google Fonts)
Secondary Font: Inter (Google Fonts)

Hierarchy:
- H1: 32px, Bold (Page titles)
- H2: 28px, SemiBold (Section headers)
- H3: 24px, SemiBold (Card titles)
- H4: 20px, Medium (Subsections)
- Body: 16px, Regular (Main text)
- Caption: 14px, Regular (Secondary text)
- Small: 12px, Medium (Labels, badges)
```

### **Spacing System**
```
Base Unit: 4px
- XS: 4px
- S: 8px
- M: 16px
- L: 24px
- XL: 32px
- XXL: 48px
```

### **Border Radius**
```
- Small: 8px (Buttons, badges)
- Medium: 12px (Cards, inputs)
- Large: 16px (Main containers)
- XLarge: 24px (Hero sections)
```

## 📱 Screen Designs

### **1. Authentication Screen**
```
Layout: Centered card with background
Components:
- Logo (🌱 + "FoodSaver" text)
- Welcome message
- 3 Quick login buttons (Consumer/Business/Admin)
- Divider line
- Email/Password form
- Toggle between Login/Register
- Footer with TekTribe branding

Dimensions: 450px width, auto height
Background: Gradient overlay on food imagery
```

### **2. Header Component**
```
Layout: Fixed top header with 3 sections
Structure:
- Top bar: Location + Support info | User info + Logout
- Main header: Logo | Search bar | Cart + User type badge
- Navigation: Role-based menu tabs

Height: ~140px total
Background: Linear gradient (Forest Green → Amber)
```

### **3. Consumer Dashboard**
```
Layout: Sidebar + Main content
Components:
- Filter sidebar (280px width)
- Food grid (3-4 columns)
- Promotional banner
- Food cards with hover effects

Food Card Design:
- 320px width, auto height
- Image area: 220px height
- Content padding: 20px
- Discount badge (top-right)
- Store logo (top-left)
- Countdown timer (bottom-left)
```

### **4. Business Dashboard**
```
Layout: Tab-based interface
Components:
- Stats cards (3 columns)
- Tab navigation (My Listings | Analytics)
- Listing management grid
- Action buttons (Edit/Remove)

Stats Cards:
- Gradient backgrounds
- Large numbers (24px)
- Icon + label
- 200px min-width
```

### **5. Admin Dashboard**
```
Layout: Complex grid system
Components:
- Analytics overview (4 columns)
- Date range picker
- Charts and graphs
- Data tables
- Moderation queue

Table Design:
- Zebra striping
- Action buttons
- Status badges
- Sortable headers
```

### **6. Cart Screen**
```
Layout: Two-column (Items | Summary)
Components:
- Cart items list
- Quantity controls
- Order summary card
- Checkout button
- Success toast messages

Summary Card:
- 320px width
- Sticky positioning
- Price breakdown
- Environmental impact note
```

### **7. Create Listing Screen**
```
Layout: Single column form
Components:
- Image upload area (drag & drop)
- Form fields (2-column grid)
- Category selector
- Price inputs
- Submit button

Form Design:
- 800px max-width
- Rounded inputs (12px)
- Clear labels
- Validation states
```

## 🎯 Component Library

### **Buttons**
```
Primary Button:
- Background: Linear gradient (Forest Green → Amber)
- Text: White, 16px, SemiBold
- Padding: 14px 24px
- Border radius: 12px
- Shadow: 0 4px 12px rgba(46, 125, 50, 0.3)

Secondary Button:
- Background: Transparent
- Border: 2px solid Forest Green
- Text: Forest Green, 16px, SemiBold
- Hover: Background Forest Green, Text White

Icon Button:
- 40px × 40px
- Border radius: 50%
- Background: rgba(255,255,255,0.2)
```

### **Cards**
```
Standard Card:
- Background: White
- Border radius: 16px
- Shadow: 0 4px 12px rgba(0,0,0,0.1)
- Padding: 24px
- Border: 1px solid #F0F0F0

Food Card:
- Hover effect: translateY(-4px)
- Image aspect ratio: 16:9
- Content padding: 20px
- Transition: 0.3s ease
```

### **Form Elements**
```
Input Field:
- Height: 48px
- Border: 2px solid #E0E0E0
- Border radius: 12px
- Padding: 14px 16px
- Focus: Border color Forest Green

Select Dropdown:
- Same as input
- Arrow icon on right
- Options with hover states

Checkbox/Radio:
- Custom styled
- Forest Green accent
- 20px size
```

### **Navigation**
```
Tab Navigation:
- Background: Surface color
- Active tab: Gradient background
- Inactive: Transparent
- Border bottom: 3px solid (active only)
- Padding: 16px 24px
```

## 📐 Layout Specifications

### **Grid System**
```
Container: 1200px max-width
Columns: 12-column grid
Gutters: 24px
Margins: 24px (mobile), 48px (desktop)
```

### **Responsive Breakpoints**
```
Mobile: 320px - 768px
Tablet: 768px - 1024px
Desktop: 1024px+

Mobile Adjustments:
- Single column layouts
- Reduced padding/margins
- Stacked navigation
- Simplified cards
```

### **Spacing Rules**
```
Section spacing: 48px
Component spacing: 24px
Element spacing: 16px
Text spacing: 8px
```

## 🎨 Visual Effects

### **Shadows**
```
Card Shadow: 0 4px 12px rgba(0,0,0,0.1)
Button Shadow: 0 4px 12px rgba(46, 125, 50, 0.3)
Header Shadow: 0 2px 8px rgba(0,0,0,0.1)
```

### **Gradients**
```
Primary: linear-gradient(135deg, #2E7D32 0%, #FF8F00 100%)
Background: linear-gradient(135deg, #F8FDF8 0%, #E8F5E8 100%)
Card Hover: 0 8px 24px rgba(46, 125, 50, 0.15)
```

### **Animations**
```
Hover Transitions: 0.3s ease
Button Press: 0.2s ease
Page Transitions: 0.4s ease-in-out
Loading States: Pulse animation
```

## 🔧 Figma Setup Instructions

### **1. Create Figma File Structure**
```
Pages:
- 🎨 Design System
- 📱 Mobile Screens
- 💻 Desktop Screens
- 🧩 Components
- 📋 Wireframes
```

### **2. Set Up Design System**
```
1. Create color styles for all brand colors
2. Set up text styles for typography hierarchy
3. Create component variants for buttons
4. Build card components with auto-layout
5. Set up grid layouts
```

### **3. Screen Dimensions**
```
Desktop: 1440px × 900px
Mobile: 375px × 812px (iPhone X)
Tablet: 768px × 1024px (iPad)
```

### **4. Component Organization**
```
Components Library:
- Buttons (Primary, Secondary, Icon)
- Cards (Food, Stats, Summary)
- Forms (Input, Select, Checkbox)
- Navigation (Header, Tabs, Sidebar)
- Modals (Success, Error, Confirmation)
```

## 🎯 Key Design Principles

1. **Sustainability Focus**: Green color palette reflects environmental mission
2. **Food-Centric**: Use food imagery and icons throughout
3. **Trust & Safety**: Clean, professional design builds user confidence
4. **Accessibility**: High contrast ratios, clear typography
5. **Mobile-First**: Responsive design prioritizing mobile experience
6. **Role Clarity**: Visual distinction between user types
7. **Action-Oriented**: Clear CTAs and user flows

This guide provides everything needed to create a comprehensive Figma design for the FoodSaver app. Each screen and component is detailed with specific measurements, colors, and styling guidelines.
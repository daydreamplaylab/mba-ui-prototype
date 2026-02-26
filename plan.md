
# Coach Marketplace Implementation Plan

This plan outlines the steps to build the Coach Marketplace UI based on the provided PRD.

## 1. Project Setup

*   Create a new directory `src/components/coach` for all marketplace-related components.
*   Create a new directory `src/pages/coach` for all marketplace-related pages.
*   Create a `src/data/coaches.js` file for mock data.

## 2. Component Implementation

I will implement the components in the following order:

1.  **Mock Data (`src/data/coaches.js`)**: Create mock data for coaches, conversations, and history.
2.  **Marketplace Dashboard (`src/pages/coach/MarketplaceDashboard.jsx`)**:
    *   Build the main layout with breadcrumbs and a welcome message.
    *   Implement the service category buttons.
    *   Implement the collapsible left sidebar with filters (Price Range, MBA School, Industry, Language).
    *   Implement the results area with the coach count and a grid of coach cards.
3.  **Coach Card (`src/components/coach/CoachCard.jsx`)**:
    *   Display coach's photo, name, verified badge, bio, service tags, MBA school, industry, price, and languages.
    *   Implement the "View Profile" button.
4.  **Coach Detail Panel (`src/components/coach/CoachDetailPanel.jsx`)**:
    *   Create a side panel that slides in from the right.
    *   Display all coach details as specified in the PRD.
    *   Implement the "Connect" button with freemium lock behavior.
5.  **Intake Form Modal (`src/components/coach/IntakeFormModal.jsx`)**:
    *   Create a modal overlay for the intake form.
    *   Implement the form fields (Coaching topic, Specific requirements, Availability).
    *   Implement the "Send Request" and "Cancel" actions.
    *   Show a confirmation message after submission.
6.  **Message Inbox (`src/pages/coach/MessageInbox.jsx`)**:
    *   Create a two-column layout for the conversation list and selected conversation.
    *   Implement the conversation list with coach photo, name, last message preview, timestamp, and unread indicator.
    *   Implement the empty state.
7.  **Conversation Thread (`src/components/coach/ConversationThread.jsx`)**:
    *   Implement the chat-style layout for messages.
    *   Implement special message types (Intake request, Payment request, Session confirmed, Session completed).
    *   Implement the message input area.
    *   Implement the "Report an Issue" flow.
8.  **Payment Checkout (`src/pages/coach/PaymentCheckout.jsx`)**:
    *   Create a two-column layout for the order summary and payment form.
    *   Implement the payment form.
    *   Show a confirmation message after successful payment.
9.  **Coach History (`src/pages/coach/CoachHistory.jsx`)**:
    *   Create a list of past sessions.
    *   Display session details as specified in the PRD.
    *   Implement the "View Notes" and "View Conversation" links.
10. **Coach-Side Dashboard (`src/pages/coach/CoachDashboard.jsx`)**:
    *   Create the coach-side dashboard with sub-navigation.
    *   Implement the "Requests" and "Sessions" views.
    *   Implement the "Send Payment Request", "Mark Complete", and "Upload Notes" flows.
11. **Coach-Side Conversation (`src/components/coach/CoachConversation.jsx`)**:
    *   Implement the coach's view of the conversation thread.

## 3. Routing

*   Update `App.jsx` to add routes for the Coach Marketplace and its sub-pages.
*   The main route will be `/coach-marketplace`.
*   Sub-routes will be created for Messages, History, Checkout, etc.
*   The Coach-Side Dashboard will be on a separate route like `/coach/dashboard`.

## 4. State Management

*   Use React Context (`UserContext.jsx`) to manage the user's subscription status (free vs. paid) to implement the freemium logic.
*   Component-level state will be used for managing form inputs, filters, and other UI states.

## 5. Styling

*   Reuse existing styles, design tokens, and components where possible to maintain consistency with the rest of the application.
*   Use CSS modules or a similar approach for component-specific styles.

## 6. Verification

*   After implementing each component, I will manually test it to ensure it meets the requirements of the PRD.
*   I will also test the responsiveness of the UI on different screen sizes.
*   Finally, I will do an end-to-end test of the entire marketplace flow.

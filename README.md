# AWS Masterclass Platform ☁️

A web-based platform I built to help students and developers learn Amazon Web Services (AWS) in a more visual and practical way. I wanted to move away from text-heavy documentation and create something more engaging for my own cloud computing studies.

## 🔗 Live Demo
[Check out the live project here](https://MohanAbhishek29.github.io/AWS-Master-Learning-Platform)

## 🚀 Key Features

### 🌌 AWS Galaxy (3D)
A 3D visualization of how different AWS services are categorized.
-   **D3 Physics**: Services repel each other so the graph doesn't get too cluttered.
-   **Auto-Rotation**: The camera slowly pans around the center so you can easily view all the service groups (Compute, Storage, Database, etc.).
-   **Visual Hierarchy**: Core AWS concepts are larger, while specific services are smaller, making it easier to read.

### 🤖 AI Study Assistant
A built-in chat interface that acts as a study helper.
-   **Context-Aware Help**: Ask questions about AWS services or get tips for studying for certifications.
-   **Custom UI**: A floating chat window built using CSS for a clean, modern look.

### 🏗️ Architecture Builder
A drag-and-drop tool to draw and plan cloud architectures.
-   **Drag & Drop**: Pick services like EC2 or S3 from a menu and place them on a canvas.
-   **Connections**: Draw basic lines between nodes to map out how data flows.
-   **Navigation Controls**: Includes standard zoom and pan tools to handle larger diagrams.

### 💻 CLI Hacker Missions
A terminal simulation game to practice CLI commands and AWS scenarios.
-   **Terminal UI**: Type commands to solve specific cloud-related problems.
-   **Time Limits**: Some challenges include a countdown timer to practice working under pressure.

### ⚔️ The Arena (Quizzes)
A quiz section to test your AWS knowledge.
-   **Practice Mode**: Answer questions at your own pace and see if you got them right immediately.
-   **Timed Modes**: Quick 60-second or 3-minute quiz modes.
-   **Streak System**: Tracks how many correct answers you get in a row.

### 🌍 Region Globe
A simple interactive 3D globe plotting the physical locations of AWS Regions and Availability Zones.

### 🏘️ Community Hub
A dedicated area to view and share AWS architectures.
-   **Blueprint Gallery**: A collection of example AWS architectures to study.
-   **Leaderboard**: A mock Hall of Fame showing top users and study points.
-   **Activity Feed**: A simulated feed of site activity or updates.
-   **Image Exports**: Download any architecture diagram as an image for your notes.

### 🔍 Global Search
A search bar to quickly jump to specific AWS services or reference pages within the app.

---

## 🛠️ Technology Stack

*   **Frontend**: React 18, Vite
*   **Styling**: Vanilla CSS (Variables, glass-style UI styling)
*   **Animations**: Framer Motion
*   **3D Graphics**: Three.js, React Three Fiber (R3F), Drei
*   **Diagramming**: React Flow
*   **Icons**: Lucide React

---

## 💻 How to Run (Development Mode)

This project uses Vite, so you'll need Node.js installed to run it.

1.  **Open Terminal** in the project folder.
2.  **Install Dependencies** (First time only):
    ```bash
    npm install
    ```
3.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
4.  **Open in Browser**:
    Click the URL shown in your terminal (usually `http://localhost:5173`).

---

## 🎨 Design Notes
*   **Dark Theme Setup**: Built primarily with a dark UI since it's easier on the eyes during long study sessions.
*   **UI Effects**: I used some blur effects and simple gradients to give the project a cleaner look.
*   **Transitions**: Added basic framer-motion animations so navigating between pages feels smooth.

# 🗓️ Custom Timeline Component

This project implements a custom React + TypeScript + Tailwind CSS component for visualizing timeline items arranged in compact, horizontal lanes.

It supports zooming, drag-and-drop and inline editing — all within a clean, calendar-style interface.

---

## 👨‍💻 About Me – Marco Túlio Teles dos Reis

I'm a **Frontend Engineer** passionate about crafting smooth, accessible, and high-impact user experiences. With deep experience in **React**, **Angular**, and **React Native**, I specialize in transforming static prototypes into performant, scalable web and mobile applications. I’ve worked across industries like fintech, logistics, and enterprise transformation — always combining clean code with thoughtful design.

🔧 **Technologies**: React, Angular, TypeScript, RxJS, TailwindCSS, Electron, Node.js  
🚀 **Experience**: Wabtec Corporation, Ernst & Young, Petrobras, PagSeguro, PimentaGroup  
🌍 **Location**: Brazil (Remote – Global Projects)  
🔗 **LinkedIn**: [linkedin.com/in/marcotulioteles](https://linkedin.com/in/marcotulioteles)  
📧 **Email**: marcotuliod3v@gmail.com

---

## ✅ What I Like About This Implementation

- **Custom Grid Layout**: The use of pure CSS grid gives full control over date alignment and visual spacing, without relying on heavy timeline libraries.
- **Snapped Drag & Resize**: Dragging and resizing items snaps to logical column positions, making the interface feel precise and intuitive.
- **Polished UI**: Soft shadows, modern fonts, consistent lane spacing, and responsive zoom controls provide a user-friendly look and feel.
- **Modular Codebase**: The component is cleanly split into smaller files (`Timeline`, `ZoomControls`, `TimelineItem`, etc.) for maintainability and reusability.

---

## 🔁 What I'd Change If I Did It Again

- **Use `react-rnd` or `dnd-kit`**: For more robust and extensible drag+resize behavior, integrating a mature library could reduce complexity and improve performance across browsers.
- **Virtualized Rendering**: For very large datasets, using a virtual scroller (e.g. `react-virtual`) would improve performance.
- **Accessibility**: While keyboard navigation and screen reader support could be added manually, I'd plan for accessibility earlier next time.

---

## 🎨 Design Decisions & Inspiration

- I was inspired by tools like **Linear**, **Notion**, and **Calendly** which use clean vertical gridlines, and minimalistic color schemes for clarity.
- I avoided full calendar libraries to retain full control over lane layout and interactions, especially the "compact lane reuse" logic.
- Timeline items are styled using Tailwind with a small dynamic color palette, inspired by event UIs in **Asana** and **Google Calendar**.

---

## 🧪 If I had more time, how I Would Test This

If this were a production feature, I would:

1. **Unit Test Helpers**:

   - Test `assignLanes()` to ensure compact placement works correctly.
   - Test `getItemOffset()` and `getItemSpan()` for accurate date math.

2. **Interaction Tests** (with tools like `@testing-library/react` + `user-event`):

   - Drag + drop behavior (does it snap to correct dates?)
   - Resize edges with mouse (do column calculations update properly?)
   - Inline editing (focus, blur, enter key updates)

3. **Performance**:
   - Simulate hundreds of items and track frame rates and memory usage.

---

## 📁 Tech Stack

- **React** + **TypeScript**
- **Tailwind CSS** for layout and design
- **date-fns** for date manipulation
- Custom state management using React hooks

---

## 🚀 Run Locally

```bash
npm install
npm run dev
```

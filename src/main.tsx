
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize mixesData if not already defined
if (typeof window !== 'undefined' && !window.mixesData) {
  window.mixesData = [
    {
      id: 1,
      title: "Statistics Mix",
      topics: ["Median", "Standard Deviation", "Average"],
      subject: "Mathematics",
      isCustom: false
    },
    {
      id: 2,
      title: "Linear relationship Word problems mix",
      topics: ["Linear equations", "Word Problems", "Slopes"],
      subject: "Mathematics",
      isCustom: false
    },
    {
      id: 3,
      title: "Quadratic functions mix",
      topics: ["Quadratic equations", "Graphs", "Vertex"],
      subject: "Mathematics",
      isCustom: false
    }
  ];
}

createRoot(document.getElementById("root")!).render(<App />);

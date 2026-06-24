import { useState } from 'react';

const FAQS = [
  { q: 'How do I add a task?', a: 'Type your task in the input field and press Enter or click the Add button.' },
  { q: 'How do I set a priority?', a: 'Click the flag icon in the input area and choose Low, Medium, or High before adding your task.' },
  { q: 'How do I set a due date?', a: 'Click the calendar icon in the input area to pick a date before adding your task.' },
  { q: 'How do I edit a task?', a: 'Double-click any task text or click the pencil icon to edit it inline. Press Enter to save or Escape to cancel.' },
  { q: 'How do I delete a task?', a: 'Hover over a task and click the red trash icon on the right side.' },
  { q: 'How do I mark a task as done?', a: 'Click the circle on the left of any task to check it off. Click again to uncheck it.' },
  { q: 'How do I filter tasks?', a: 'Use the All / Active / Completed tabs to show only the tasks you want.' },
  { q: 'How do I search tasks?', a: 'Type in the search bar to instantly filter tasks by keyword.' },
  { q: 'Are my tasks saved?', a: 'Yes! Tasks are saved to your browser automatically and will still be there when you refresh.' },
  { q: 'How do I switch to dark mode?', a: 'Click the moon icon in the top-right corner of the app to toggle dark mode.' },
];

interface Props {
  onClose: () => void;
}

export default function FAQModal({ onClose }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Frequently Asked Questions</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>

        {/* FAQ list */}
        <div className="overflow-y-auto flex-1 px-4 py-3 flex flex-col gap-1">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">{faq.q}</span>
                <span className="text-gray-300 text-xs ml-2 flex-shrink-0">{open === i ? '▲' : '▼'}</span>
              </button>
              {open === i && (
                <div className="px-4 pb-3 text-sm text-gray-500 border-t border-gray-50 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

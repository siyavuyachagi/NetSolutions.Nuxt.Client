// Define literal types for toast positions and types
type ToastPosition =
  | "top-center"
  | "top-left"
  | "top-right"
  | "bottom-center"
  | "bottom-left"
  | "bottom-right";

type ToastType = "success" | "error" | "info" | "warning";

const toast = (() => {
  const positions = {
    "top-center": "top-10 left-1/2 transform -translate-x-1/2",
    "top-left": "top-10 left-10",
    "top-right": "top-10 right-10",
    "bottom-center": "bottom-10 left-1/2 transform -translate-x-1/2",
    "bottom-left": "bottom-10 left-10",
    "bottom-right": "bottom-10 right-10",
  };

  const icons = {
    success: `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="m9 12 2 2 4-4"/>
            </svg>
        `,
    error: `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
        `,
    info: `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
        `,
    warning: `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
            </svg>
        `,
  };

  const createContainer = (position: ToastPosition) => {
    const existingContainer = document.querySelector(
      `.toast-container[data-position="${position}"]`
    );
    if (existingContainer) {
      return existingContainer;
    }
    const container = document.createElement("div");
    container.className = `toast-container fixed ${
      positions[position] || "bottom-right"
    } z-50 space-y-2 pointer-events-none`;
    container.setAttribute("data-position", position);
    document.body.appendChild(container);
    return container;
  };

  const createToastElement = (message: string, type: ToastType) => {
    const toastEl = document.createElement("div");
    const typeStyles = {
      success: { color: "bg-green-500 bg-opacity-70" },
      error: { color: "bg-red-500 bg-opacity-70" },
      info: { color: "bg-blue-500 bg-opacity-70" },
      warning: { color: "bg-yellow-500 bg-opacity-70" },
    };

    const { color } = typeStyles[type] || { color: "bg-gray-800" };
    toastEl.className = `toast p-3 rounded-lg shadow-lg text-white pointer-events-auto ${color} flex items-center space-x-3 transition-opacity duration-1000 opacity-100`;

    // Adding SVG icon
    const iconEl = document.createElement("div");
    iconEl.innerHTML = icons[type];
    iconEl.className = "w-6 h-6 flex-shrink-0";
    toastEl.appendChild(iconEl);

    // Adding message
    const messageEl = document.createElement("span");
    messageEl.textContent = message;
    messageEl.className = "flex-grow";
    toastEl.appendChild(messageEl);

    return toastEl;
  };

  const showToast = (
    message: string,
    type: ToastType = "info",
    position: ToastPosition = "bottom-right",
    duration = 3000
  ) => {
    const container = createContainer(position);
    const toastEl = createToastElement(message, type);

    container.appendChild(toastEl);

    setTimeout(() => {
      toastEl.classList.add("!opacity-0");
      setTimeout(() => toastEl.remove(), duration);
    }, duration);
  };

  // Public methods with type-restricted options
  return {
    /**
     * Success toast
     * @param message Display message
     * @param position Toast position relative to the screen (Optional)
     * @param duration Duration in miliseconds (Optional)
     */
    success: (
      message: string,
      position: ToastPosition = "top-center",
      duration = 3000
    ) => {
      showToast(message, "success", position, duration);
    },
    /**
     * Error toast
     * @param message Display message
     * @param position Toast position relative to the screen (Optional)
     * @param duration Duration in miliseconds (Optional)
     */
    error: (
      message: string,
      position: ToastPosition = "bottom-right",
      duration = 3000
    ) => {
      showToast(message, "error", position, duration);
    },
    /**
     * Information toast
     * @param message Display message
     * @param position Toast position relative to the screen (Optional)
     * @param duration Duration in miliseconds (Optional)
     */
    info: (
      message: string,
      position: ToastPosition = "bottom-left",
      duration = 3000
    ) => {
      showToast(message, "info", position, duration);
    },
    /**
     * Warning toast
     * @param message Display message
     * @param position Toast position relative to the screen (Optional)
     * @param duration Duration in miliseconds (Optional)
     */
    warning: (
      message: string,
      position: ToastPosition = "bottom-left",
      duration = 3000
    ) => {
      showToast(message, "warning", position, duration);
    },
  };
})();

export default toast;

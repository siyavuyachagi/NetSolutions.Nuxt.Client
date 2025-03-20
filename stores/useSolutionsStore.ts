import solutionService from "~/services/solutionService";

export const useSolutionsStore = defineStore("solutions-store", () => {
  const STORAGE_KEY = "ns-solutions-store";

  const solutions = ref<any[] | null>(null);

  function loadSolutions() {
    if (import.meta.client) {
      const stringSolutions = sessionStorage.getItem(STORAGE_KEY);
      if (!stringSolutions) return;
      solutions.value = JSON.parse(stringSolutions);
      console.log("Solutions loaded locally", solutions.value);
    }
  }

  function updateSolutions(newSolutions: any[]) {
    if (import.meta.client) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newSolutions));
      solutions.value = newSolutions;
      console.log("Solutions stored locally", solutions.value);
    }
  }

  //✅Initial call to fetch data
  loadSolutions();

  return {
    solutions,
    loadSolutions,
    updateSolutions,
  };
});

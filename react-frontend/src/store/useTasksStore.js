import { create } from "zustand";
import getAllTasks from "../utils/getAllTasks";

const useTasksStore = create((set) => {
  return {
    tasks: [],
    loading: false,
    error: null,
    fetchTasks: async () => {
      set((state) => ({ loading: true })); // start fetching
      const res = await getAllTasks(); // got response

      if (res.error) {
        // if error then set error

        set((state) => (state.error = true));
        set((state) => (state.loading = false));
      }
      // else set the data (tasks)
      set((state) => ({ tasks: [...res.tasks] }));
      set((state) => ({ error: false }));
      set((state) => ({ loading: false }));
    },
  };
});

export default useTasksStore;

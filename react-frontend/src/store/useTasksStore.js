import { create } from "zustand";
import getAllTasks from "../utils/getAllTasks";
import { updateTask } from "../utils/updateTask";

const useTasksStore = create((set, get) => {
  return {
    tasks: [],
    loading: false,
    error: null,

    getTasksByState: (taskState) => {
      return get().tasks.filter((task) => task.state === taskState);
    },

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

    updateTasks: async ({ id, title, description, state, difficulty }) => {
      set(() => {
        loading: true;
      });

      const res = await updateTask({
        id,
        title,
        description,
        state,
        difficulty,
      });

      set(() => {
        loading: false;
      });
      if (res.error) {
        set(() => {
          error: res.error;
        });
      } else {
        set(() => {
          error: false;
        });
      }
    },
  };
});

export default useTasksStore;

import { create } from "zustand";
import getAllTasks from "../utils/getAllTasks";
import { updateTask } from "../utils/updateTask";

const useTasksStore = create((set, get) => {
  return {
    tasks: [],
    loading: false,
    error: null,
    taskDetailsOn: false,
    showAddTaskModal: false,
    taskStateInModal: null, // todo, progress, review, finished

    openAddTaskModal: (taskState) =>
      set(() => ({ showAddTaskModal: true, taskStateInModal: taskState })),

    closeAddTaskModal: () =>
      set(() => ({ showAddTaskModal: false, taskStateInModal: null })),

    // we have pass this with data while showing the task details section
    taskDetails: {
      id: null,
      title: null,
      description: null,
      state: null,
      difficulty: null,
    },

    // ------- actions -------

    showTaskDetails: ({ id, title, description, state, difficulty }) => {
      set(() => {
        return { taskDetailsOn: true };
      });

      // set the data for task details page
      set(() => {
        return { taskDetails: { id, title, description, state, difficulty } };
      });
    },

    hideTaskDetails: () => {
      set(() => {
        return { taskDetailsOn: false };
      });
      // while hidding set the task details data fileds null
      set(() => {
        return {
          taskDetails: {
            id: null,
            title: null,
            description: null,
            state: null,
            difficulty: null,
          },
        };
      });
    },

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

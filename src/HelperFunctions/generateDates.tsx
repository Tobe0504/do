import { tasksType } from "../Utilities/tasks";

interface TaskSummary {
  name: string;
  taskCount: number;
  numberComplete: number;
}

export function generateTaskSummary(tasks: tasksType[]): TaskSummary[] {
  if (tasks.length === 0) return [];

  const formatDate = (date: Date): string => date.toISOString().split("T")[0];

  const tasksPerDay: Record<
    string,
    { taskCount: number; numberComplete: number }
  > = {};

  tasks.forEach((task) => {
    const date = formatDate(new Date(task.dateAdded));

    if (!tasksPerDay[date]) {
      tasksPerDay[date] = { taskCount: 0, numberComplete: 0 };
    }

    tasksPerDay[date].taskCount++;
    if (task.percentageComplete === 100) {
      tasksPerDay[date].numberComplete++;
    }
  });

  const sortedDates = Object.keys(tasksPerDay).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const startDate = new Date(sortedDates[0]);
  const endDate = new Date(); // Today's date

  const result: TaskSummary[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = formatDate(currentDate);

    result.push({
      name: dateStr,
      taskCount: tasksPerDay[dateStr]?.taskCount || 0,
      numberComplete: tasksPerDay[dateStr]?.numberComplete || 0,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

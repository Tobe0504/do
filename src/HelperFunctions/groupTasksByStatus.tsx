export const groupTasksByStatus = (tasks: any[]) => {
  return tasks.reduce((groups, task) => {
    const status = task.status;
    if (!groups[status]) groups[status] = [];
    groups[status].push(task);
    return groups;
  }, {} as Record<string, any[]>);
};

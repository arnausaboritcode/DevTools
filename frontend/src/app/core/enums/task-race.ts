export enum TaskRace {
  Extension,
  Resource,
}

export const taskRaceLabels: Record<TaskRace, string> = {
  [TaskRace.Extension]: 'Extension',
  [TaskRace.Resource]: 'Resource',
};

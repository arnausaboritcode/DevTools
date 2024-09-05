export enum TaskRace {
  Extension,
  Resource,
}

export const taskRaceLabels: Record<TaskRace, string> = {
  [TaskRace.Extension]: 'Extensión',
  [TaskRace.Resource]: 'Recurso',
};

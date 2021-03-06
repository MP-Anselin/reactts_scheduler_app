export const getDatabase = () => {
  let db: any = localStorage.getItem('$calendar_info');
  if (!db) {
    db = [];
    setDatabase(db);
  } else {
    db = JSON.parse(db);
    db.map(
      (task: { date: string | number | Date }) =>
        (task.date = new Date(task.date)),
    );
  }
  return db;
};

export const setDatabase = (db: string | null) => {
  localStorage.setItem('$calendar_info', JSON.stringify(db));
};

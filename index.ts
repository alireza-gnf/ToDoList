type status = 'Pending' | 'Done';

interface TaskProperties {
  id: Symbol;
  title: string;
  status: status;
}

class Task implements TaskProperties {
  public id: Symbol = Symbol();
  constructor(public title: string, public status: status = 'Pending') {}

  mark_as_done() {
    this.status = 'Done';
  }

  mark_as_pending() {
    this.status = 'Pending';
  }
}

class ToDoList {
  constructor(private taskList: Task[] = []) {}

  tasks(): Task[] {
    return this.taskList;
  }

  add(task: Task) {
    this.taskList.push(task);
  }

  filter(properties: Partial<TaskProperties>): Task[] {
    return this.taskList.filter((task) => {
      return (
        (properties.id ? properties.id === task.id : true) &&
        (properties.title ? properties.title === task.title : true) &&
        (properties.status ? properties.status === task.status : true)
      );
    });
  }

  delete(task: Task) {
    this.taskList = this.taskList.filter((value) => value.id !== task.id);
  }

  search(title: string): Task[] {
    return this.taskList.filter((task) => task.title == title);
  }
}

const list = new ToDoList();

list.add(new Task('task 1'));
list.add(new Task('task 2'));
list.add(new Task('task 3'));
list.add(new Task('task 4', 'Done'));
list.add(new Task('task 4', 'Done'));

const task_2 = list.search('task 2')[0];
if (task_2) {
  task_2.mark_as_done();
}
console.log(list.tasks());

const done_task = list.filter({
  title: 'task 2',
});
if (done_task[0]) {
  list.delete(done_task[0]);
}
console.log(list.tasks());

const make_pending = list.filter({
  title: 'task 4',
  status: 'Done',
});
if (make_pending[0]) {
  make_pending[0].mark_as_pending();
}
console.log(list.tasks());

type Employee = {
  workerId: string;
  position: string;
  compensation: number;
};

type EmployeeWorkhourRecord = {
  workerId: string;
  timestamp: number;
  type: "in" | "out";
};

class WorkersGame {
  workers: Map<string, Employee>;
  employeeWorkhourRecords: Map<string, EmployeeWorkhourRecord[]>;

  constructor() {
    this.workers = new Map<string, Employee>();
    this.employeeWorkhourRecords = new Map<string, EmployeeWorkhourRecord[]>();
  }

  addEmployee(worker: Employee) {
    const existingWorker = this.workers.has(worker.workerId);
    if (existingWorker) {
      return "invalid_request: User already exists";
    }
    this.workers.set(worker.workerId, worker);
    this.employeeWorkhourRecords.set(worker.workerId, []);
    return "success";
  }

  getAllEmployees() {
    return Array.from(this.workers.values());
  }

  registerEmployeeWorkhour(workerId: string, timestamp: number) {
    const existingWorker = this.workers.has(workerId);
    if (!existingWorker) {
      return "invalid_request: User does not exist";
    }

    const currentEmployeeRecord = this.employeeWorkhourRecords.get(workerId);
    if (currentEmployeeRecord == null) {
      return "invalid_request: User does not exist";
    }

    if (currentEmployeeRecord.length % 2 === 0) {
      this.employeeWorkhourRecords.set(
        workerId,
        currentEmployeeRecord.concat({ workerId, timestamp, type: "in" })
      );
    } else {
      this.employeeWorkhourRecords.set(
        workerId,
        currentEmployeeRecord.concat({ workerId, timestamp, type: "out" })
      );
    }
    return "success";
  }

  getTotalWorkingHours(workerId: string) {
    const currentEmployeeRecord = this.employeeWorkhourRecords.get(workerId);
    if (currentEmployeeRecord == null) {
      return 0;
    }

    let len =
      currentEmployeeRecord.length % 2 === 0
        ? currentEmployeeRecord.length
        : currentEmployeeRecord.length - 1;

    let totalWorkingHours = 0;
    for (let i = 0; i < len; i += 2) {
      const inRecord = currentEmployeeRecord[i];
      const outRecord = currentEmployeeRecord[i + 1];
      totalWorkingHours += outRecord.timestamp - inRecord.timestamp;
    }
    return totalWorkingHours;
  }

  topNWorkhours(n: number, position: string) {
    const workersArray = Array.from(this.workers.values());
    const filteredWorkers = workersArray
      .filter((worker) => worker.position === position)
      .map((worker) => ({
        ...worker,
        timeSpent: this.getTotalWorkingHours(worker.workerId),
      }))
      .sort((a, b) => b.timeSpent - a.timeSpent)
      .slice(0, n)
      .map((worker) => `${worker.workerId}(${worker.timeSpent})`);
    return filteredWorkers;
  }
}

// Test
const wg = new WorkersGame();
wg.addEmployee({
  workerId: "Hanif",
  position: "Software Engineer",
  compensation: 4000,
});
wg.addEmployee({
  workerId: "Asad",
  position: "Software Engineer",
  compensation: 2000,
});
wg.registerEmployeeWorkhour("Hanif", 0);
wg.registerEmployeeWorkhour("Hanif", 15);
wg.registerEmployeeWorkhour("Hanif", 30);
wg.registerEmployeeWorkhour("Hanif", 45);
wg.registerEmployeeWorkhour("Hanif", 60);
wg.registerEmployeeWorkhour("Asad", 50);
wg.registerEmployeeWorkhour("Asad", 70);
wg.registerEmployeeWorkhour("Asad", 75);
wg.addEmployee({ workerId: "Ali", position: "UI/UX", compensation: 1500 });
wg.registerEmployeeWorkhour("Ali", 10);
wg.registerEmployeeWorkhour("Ali", 20);
wg.addEmployee({
  workerId: "Nabil",
  position: "Software Engineer",
  compensation: 1500,
});

console.log("totalWorkingHours Hanif:", wg.getTotalWorkingHours("Hanif"));
console.log("totalWorkingHours Asad:", wg.getTotalWorkingHours("Asad"));

const topPerformers = wg.topNWorkhours(3, "Software Engineer");
console.log("topPerformers:", topPerformers);

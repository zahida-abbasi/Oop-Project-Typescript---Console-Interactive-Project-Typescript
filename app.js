import inquirer from "inquirer";
// creat student class
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
// creat person class
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
// use await to ask user
const programStart = async (persons) => {
    let keepRunning = true;
    while (keepRunning) {
        const ans = await inquirer.prompt({
            type: "list",
            message: "Whom do you want to talk to?",
            name: "select",
            choices: ["Self", "Student", "Exit"],
        });
        if (ans.select === "Self") {
            console.log("Hello, I am talking to myself.");
            console.log("I am fine.");
        }
        else if (ans.select === "Student") {
            const studentAns = await inquirer.prompt({
                type: "input",
                name: "student",
                message: "Whom would you like to talk to?"
            });
            const student = persons.students.find(val => val.name === studentAns.student);
            if (!student) {
                const newStudent = new Student(studentAns.student);
                persons.addStudent(newStudent);
                console.log(`Hello, I am ${newStudent.name}, and I am well.`);
            }
            else {
                console.log(`Hello, I am ${student.name}, and I am fine.`);
            }
            console.log(persons.students);
        }
        else if (ans.select === "Exit") {
            const exitAns = await inquirer.prompt({
                type: "list",
                message: "What do you want to do?",
                name: "exitOption",
                choices: ["Exit the program", "Go back"],
            });
            if (exitAns.exitOption === "Exit the program") {
                keepRunning = false;
            }
        }
    }
};
// invoke the function
programStart(persons);

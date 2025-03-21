function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour, 
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date,
    });
    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date,
    });
    return this;
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    if (!timeIn || !timeOut) {
        throw new Error("Missing time-in or time-out event for the given date.");
    }
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
}

/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!


As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
*/


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
 
 
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
 
 
    return payable
 }
 

 function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
        return total + allWagesFor.call(employee);
    }, 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

let employees = [
    {
        firstName: 'Polly',
        familyName: 'Nyaribari',
        title: 'Web Developer',
        payPerHour: 20,
        timeInEvents: [
            { 
                type: 'TimeIn', 
                hour: 900, 
                date: '2025-02-03' 
            },
            { 
                type: 'TimeIn', 
                hour: 800, 
                date: '2025-02-06' 
            }
        ],
        timeOutEvents: [
            { 
                type: 'TimeOut', 
                hour: 1700, 
                date: '2025-02-03' 
            },
            { 
                type: 'TimeOut', 
                hour: 1600, 
                date: '2025-02-06' 
            }
        ]
    },
    {
        firstName: 'Kylian',
        familyName: 'Raini',
        title: 'Architect',
        payPerHour: 25,
        timeInEvents: [
            { 
                type: 'TimeIn', 
                hour: 1000, 
                date: '2025-02-04' 
            },
            { 
                type: 'TimeIn', 
                hour: 900, 
                date: '2025-02-10' 
            }
        ],
        timeOutEvents: [
            { 
                type: 'TimeOut', 
                hour: 1800, 
                date: '2025-02-04' 
            },
            { 
                type: 'TimeOut', 
                hour: 1700, 
                date: '2025-02-10' 
            }
        ]
    }
];
const totalPayroll = calculatePayroll(employees);
console.log(totalPayroll);
const createEmployeeRecord = function (recArr) {
return{
    firstName: recArr[0],
    familyName: recArr[1],
    title: recArr[2],
    payPerHour: recArr[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

const createEmployeeRecords = function (arrOfRecs) {
    return arrOfRecs.map(rec => createEmployeeRecord(rec))
}

const createTimeInEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    const inEvent = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    this.timeInEvents.push(inEvent)
    
    return this
}

const createTimeOutEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    const outEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(outEvent)
    
    return this
}

const hoursWorkedOnDate = function (date) {
    const inEvent = this.timeInEvents.find(e => e.date === date)
    const outEvent =  this.timeOutEvents.find(e => e.date === date)
    return (outEvent.hour - inEvent.hour) / 100

}

const wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
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

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(rec => rec.firstName == firstName)
}

const calculatePayroll = function (recordsArr) {
    return recordsArr.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}
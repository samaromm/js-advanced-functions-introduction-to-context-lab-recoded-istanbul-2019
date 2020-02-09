// Your code here

function createEmployeeRecord(arr){
  return {firstName:arr[0],
          familyName:arr[1],
          title:arr[2],
          payPerHour:arr[3],
          timeInEvents:[],
          timeOutEvents:[]}
}


function createEmployeeRecords(arr){
  let records=[]
  for(let a of arr){
    records.push(createEmployeeRecord(a))
  }
  return records
}

function createTimeInEvent(arr,timeIn){
  let time=timeIn.split(' ')
  let timeObj={type: "TimeIn",hour:parseInt(time[1]),date:time[0]}
  arr.timeInEvents.push(timeObj)
  return arr
}

function createTimeOutEvent(arr,timeIn){
  let time=timeIn.split(' ')
  let timeObj={type: "TimeOut",hour:parseInt(time[1]),date:time[0]}
  arr.timeOutEvents.push(timeObj)
  return arr
}

function hoursWorkedOnDate(arr,date){
  let timeIn=arr.timeInEvents, timeOut = arr.timeOutEvents,inHours=0,outHours=0
  for(let a of timeIn){
    if(a.date==date) {inHours=a.hour; break}
  }
   for(let a of timeOut){
    if(a.date==date) {outHours=a.hour; break}
  }
  return (outHours-inHours)/100
}

function wagesEarnedOnDate(arr,date){
  let hours=hoursWorkedOnDate(arr,date)
  return hours*arr.payPerHour
}

function allWagesFor(record){
  let dates=[]
  for(let a of record.timeInEvents){dates.push(a.date)}
  return dates.reduce(function(total,ele){return total+=wagesEarnedOnDate(record,ele)},0)
}

function calculatePayroll(emplys){
  return emplys.reduce(function(total,ele){return total+=allWagesFor(ele)},0)
}

function findEmployeeByFirstName(arr,name){
  for(let ele of arr){
    if(ele.firstName==name)return ele
  }
}
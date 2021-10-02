import { DocumentDefinition } from "mongoose";

import TimeTrackerData, { TimeTrackerDataDocument, TimeTrackerDataSchema } from "../models/time-tracker-data.model";
import Position from "../models/position.model";

interface stateUpdate {
  Duration: number;
  Position: number;
}

function isStateUpdate(object: any): object is stateUpdate {
  return 'Duration' in object && 'Position' in object;
}

interface dateUpdate {
  Date: string | null;
}

function isDateUpdate(object: any): object is dateUpdate {
  return 'Date' in object;
}

export async function cleanUpData(data: any) {
  if (data == null || data.length == 0) {
    return null;
  }
  const numberOfSessions = data.filter((x: any) => x.Date != null).length + 1; // +1 for older sessions
  let sessionDates = new Array<Date | null>(numberOfSessions);
  let sessions = new Array<stateUpdate[]>(numberOfSessions);
  let currentLabels = [];
  // initialize sessions
  for (let i = 0; i < sessions.length; i++) {
    sessions[i] = [];
  }
  let sessionCounter = 0;
  sessionDates[0] = null;
  // fill sessions & dates
  for (let i = 0; i < data.length; i++) {
    if (isDateUpdate(data[i])) {
      sessionCounter++;
      const date = data[i].Date.split("@")[0];
      const time = data[i].Date.split("@")[1];
      const patternDots = /(\d{2})\.(\d{2})\.(\d{4})/;
      const dateTime = new Date(date.replace(patternDots,'$3-$2-$1') + " " + time);
      sessionDates[sessionCounter] = dateTime;
    } else if (isStateUpdate(data[i])) {
      sessions[sessionCounter].push(data[i]);
    }
  }
  // squish durations
  for (let i = 0; i < numberOfSessions; i++) {
    let currentPosition = -1;
    let currentDuration = 0;
    let session = [];
    for (let j = 0; j < sessions[i].length; j++) {
      if (currentPosition == sessions[i][j].Position) {
        // merge durations
        currentDuration = Number(currentDuration) + Number(sessions[i][j].Duration);
      } else {
        if (currentPosition != -1) {
          // push old duration
          session.push({ Duration: currentDuration, Position: currentPosition });
        }
        // create new current duration
        currentPosition = sessions[i][j].Position;
        currentDuration = sessions[i][j].Duration;
      }
      // only for last entry
      if (j == sessions[i].length - 1) {
        session.push({ Duration: currentDuration, Position: currentPosition });
      }
    }
    sessions[i] = session;
  }
  // get current position labels
  for (let i = 1; i <= 6; i++) {
    const position = await Position.findOne({index: i});
    if (position == null) {
      return null;
    }
    currentLabels.push(position.label);
  }
  // TODO: old session
  // new sessions
  for (let i = 1; i < numberOfSessions; i++) {
    let secondsToAdd = 0;
    let date = sessionDates[i];
    if (date == null) {
      continue;
    }
    let timeTrackerData = [];
    for (let j = 0; j < sessions[i].length; j++) {
      secondsToAdd = Number(secondsToAdd) + Number(sessions[i][j].Duration);
      if (sessions[i][j].Position != 0) {
        const startDate = new Date(date.getTime());
        date.setSeconds(date.getSeconds() + secondsToAdd);
        console.log(secondsToAdd);
        const endDate = new Date(date.getTime());
        const dataEntry = {
          start: startDate,
          end: endDate,
          label: currentLabels[sessions[i][j].Position - 1]
        };
        timeTrackerData.push(dataEntry);
      }
    }
    const timeTrackerDataCreated = await createTimeTrackerData(timeTrackerData);
    console.log(timeTrackerDataCreated);
  }
  console.log(sessions);
  console.log(sessionDates);
  return sessions;
}

export async function createTimeTrackerData(timeTrackerData: DocumentDefinition<TimeTrackerDataDocument>[]) {
  try {
    return await TimeTrackerData.create(timeTrackerData);
  } catch (error: any) {
    throw new Error(error);
  }
}

// function removeIndexes(array: any, indexes: number[]) {
//   for (let i = indexes.length - 1; i >= 0; i--) {
//     array.splice(indexes[i], 1);
//   }
//   return array;
// }

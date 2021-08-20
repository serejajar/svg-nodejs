import { startOfDay } from 'date-fns';

const DutyStatus = {
  Dr: 'Dr',
  Off: 'Off',
  On: 'On',
  Pc: 'Pc',
  Sb: 'Sb',
  Ym: 'Ym'
}

function getPosX(timestamp) {
  const tzOffset = new Date().getTimezoneOffset() / 60;
  const startDayTs = startOfDay(timestamp * 1000).getTime() / 1000;
  return (timestamp - startDayTs) / 3600 + tzOffset;
}

function getPosY(dutyStatus) {
  switch (dutyStatus) {
    case DutyStatus.Off:
      return 3.5;
    case DutyStatus.Sb:
      return 2.5;
    case DutyStatus.Dr:
      return 1.5;
    case DutyStatus.On:
    case DutyStatus.Ym:
      return 0.5;
    default: {
      return 0;
    }
  }
}

const processRecords = (records) => {
  return records.map((record) => {
    const y = getPosY(record.dutyStatus);
    const x = getPosX(record.timestamp);

    return [x, y];
  });
};

export default processRecords;

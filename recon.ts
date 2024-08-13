import XLSX from "xlsx";

interface BankRecord {
  transactionName: string;
  date: string;
  amount: number;
}
interface BankRecordWithStatus extends BankRecord {
  status: string;
}
interface InternalRecord {
  vaNumber: string;
  schoolCode: string;
  schoolName: string;
  studentName: string;
  amount: number;
}

const readInternalRecord = async (file: File): Promise<InternalRecord[]> => {
  const buffer = await file.arrayBuffer();
  const data = new Uint8Array(buffer);
  const workbook = XLSX.read(data, { type: "array" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0] || 0];
  return [];
};
const readBankRecord = async (file: File): Promise<BankRecord[]> => {
  const buffer = await file.arrayBuffer();
  const data = new Uint8Array(buffer);
  const workbook = XLSX.read(data, { type: "array" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0] || 0];
  return [];
};

const markRowStatus = (
  internalRecords: InternalRecord[],
  bankRecords: BankRecord[]
): BankRecordWithStatus[] => {
  // bad time:
  const result = bankRecords.map((bankRecord) => {
    const bankRecordVaNumber = getVaNumberFromTrx(bankRecord.transactionName);

    let status = "";
    internalRecords.forEach((internalRecord) => {
      if (bankRecordVaNumber === internalRecord.vaNumber) {
        if (internalRecord.amount === bankRecord.amount) {
          status = "AMAN";
        }
      }
    });
    return { ...bankRecord, status };
  });
  return result;
};

const getVaNumberFromTrx = (input: string): string => {
  const startIndex = input.indexOf("127");
  const vaNumber = input.slice(startIndex, startIndex + 18);
  return vaNumber;
};

const splitVaNumber = (vaNumber: string): { left: string; right: string } => {
  const a = vaNumber.split("0");
  return { left: a[0], right: a[1] };
};

// const pipe = (...fns) => fns.reduce((fn, cur) => fn(cur));

// Test case
console.log(
  getVaNumberFromTrx(
    "BRIVA127060000000267170NBMBIQLIMA ARSYA ESB:NBMB:0200200P:493496516597"
  )
);
console.log(
  getVaNumberFromTrx(
    "BRIVA127060000000272563NBMBMUHAMAD FAHRE ESB:NBMB:0200200P:493502002745"
  )
);
console.log(
  getVaNumberFromTrx(
    "BRIVA127060000000317526NBMBMutiara Mauli ESB:NBMB:0200200P:493503967703"
  )
);
console.log(
  getVaNumberFromTrx(
    "BRIVA127060000000183612NBMBRamzi Fairuz ESB:NBMB:0200200P:493505973029"
  )
);
console.log(
  getVaNumberFromTrx(
    "BRIVA127060000000295840NBMBRARA PUTRI MA ESB:NBMB:0200200P:493506557999"
  )
);
console.log(
  getVaNumberFromTrx(
    "127060000000959095#004138255402#ATM #TRF TRF LINK FROM SOBIRIN LN127060000000959095ATM 4215701500340776"
  )
);

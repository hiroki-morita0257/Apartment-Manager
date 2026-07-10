export type Building = {
  id: string;
  name: string;
};

export type Room = {
  id: string;
  buildingId: string;
  floor: string;
  roomNumber: string;
  name: string;
  note: string | null;
};

export type Repair = {
  id: string;
  roomId: string;
  repairedAt: string;
  description: string;
  amount: number | null;
  estimateFileKey: string | null;
};

export const buildings: Building[] = [
  { id: "k2", name: "K2ハイム" },
  { id: "hagi", name: "コーポ萩" },
];

export const rooms: Room[] = [
  {
    id: "1",
    buildingId: "k2",
    floor: "1F",
    roomNumber: "101",
    name: "101号室",
    note: "1階の角部屋",
  },
  {
    id: "2",
    buildingId: "k2",
    floor: "1F",
    roomNumber: "102",
    name: "102号室",
    note: null,
  },
  {
    id: "3",
    buildingId: "k2",
    floor: "2F",
    roomNumber: "201",
    name: "201号室",
    note: "2階・階段側",
  },
  { id: "4", buildingId: "k2", floor: "1F", roomNumber: "103", name: "103号室", note: null },
  { id: "5", buildingId: "k2", floor: "1F", roomNumber: "105", name: "105号室", note: null },
  { id: "6", buildingId: "k2", floor: "2F", roomNumber: "202", name: "202号室", note: null },
  { id: "7", buildingId: "k2", floor: "2F", roomNumber: "203", name: "203号室", note: null },
  { id: "8", buildingId: "k2", floor: "2F", roomNumber: "205", name: "205号室", note: null },
  { id: "9", buildingId: "k2", floor: "3F", roomNumber: "301", name: "301号室", note: null },
  { id: "10", buildingId: "k2", floor: "3F", roomNumber: "302", name: "302号室", note: null },
  { id: "11", buildingId: "k2", floor: "3F", roomNumber: "303", name: "303号室", note: null },
  { id: "12", buildingId: "k2", floor: "3F", roomNumber: "305", name: "305号室", note: null },
  { id: "13", buildingId: "hagi", floor: "2F", roomNumber: "A", name: "A号室", note: null },
  { id: "14", buildingId: "hagi", floor: "2F", roomNumber: "B", name: "B号室", note: null },
  { id: "15", buildingId: "k2", floor: "common", roomNumber: "comK2", name: "共用部分", note: null },
  { id: "16", buildingId: "hagi", floor: "common", roomNumber: "comHagi", name: "共用部分", note: null },
];

export const repairs: Repair[] = [
  {
    id: "1",
    roomId: "1",
    repairedAt: "2026-06-01",
    description: "エアコン修理",
    amount: 33000,
    estimateFileKey: "repairs/1/estimate/example.pdf",
  },
  {
    id: "2",
    roomId: "1",
    repairedAt: "2026-06-15",
    description: "水漏れ確認",
    amount: null,
    estimateFileKey: null,
  },
  {
    id: "3",
    roomId: "1",
    repairedAt: "2026-05-10",
    description: "キッチン水栓の交換",
    amount: 28600,
    estimateFileKey: null,
  },
  {
    id: "4",
    roomId: "2",
    repairedAt: "2026-04-22",
    description: "玄関ドアの建て付け調整",
    amount: 11000,
    estimateFileKey: "repairs/4/estimate/example.pdf",
  },
];

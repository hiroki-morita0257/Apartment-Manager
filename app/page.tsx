import Link from "next/link";
import { buildings, rooms, type Building } from "@/src/data/mock-data";

const menuItems = ["入居者一覧", "契約管理", "修繕履歴", "家賃確認"];
const roomButtonWidth = 200;

function BuildingCard({
  building,
}: {
  building: Building;
}) {
  const buildingRooms = rooms.filter((room) => room.buildingId === building.id);
  const sharedRoom = buildingRooms.find((room) => room.floor === "common");
  const floorLevels = [
    ...new Set(
      buildingRooms
        .filter((room) => room.floor !== "common")
        .map((room) => room.floor),
    ),
  ].sort((a, b) => b.localeCompare(a, "ja", { numeric: true }));
  const floors = floorLevels.map((level) => ({
    level,
    rooms: buildingRooms
      .filter((room) => room.floor === level)
      .sort((a, b) =>
        a.roomNumber.localeCompare(b.roomNumber, "ja", { numeric: true }),
      ),
  }));
  const maxRooms = Math.max(...floors.map((floor) => floor.rooms.length), 2);
  const gridTemplateColumns = `52px repeat(${maxRooms}, ${roomButtonWidth}px)`;

  return (
    <section className="rounded-xl border border-slate-300 bg-white p-3">
      <div className="mb-2">
        <h2 className="text-sm font-semibold text-slate-900">{building.name}</h2>
      </div>

      <div className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5">
        <div className="space-y-2">
          {floors.map((floor) => (
            <div
              key={floor.level}
              className="grid items-stretch gap-2"
              style={{ gridTemplateColumns }}
            >
              <div className="flex h-14 items-center justify-center rounded-lg bg-slate-700 text-[11px] font-medium text-white">
                {floor.level}
              </div>

              {Array.from({ length: maxRooms }).map((_, index) => {
                const room = floor.rooms[index];

                return room ? (
                  <Link
                    key={room.id}
                    href={`/rooms/${room.id}`}
                    className="flex h-14 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
                  >
                    {room.roomNumber}
                  </Link>
                ) : (
                  <div
                    key={`${floor.level}-empty-${index}`}
                    className="h-14 rounded-lg border border-dashed border-slate-200 bg-transparent"
                  />
                );
              })}
            </div>
          ))}

          <div className="grid items-stretch gap-2" style={{ gridTemplateColumns }}>
            <div className="flex h-14 items-center justify-center rounded-lg bg-slate-200 text-[11px] font-medium text-slate-600">
              共用
            </div>
            {sharedRoom ? (
              <Link
                href={`/rooms/${sharedRoom.id}`}
                className="col-span-2 flex h-14 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
              >
                {sharedRoom.name}
              </Link>
            ) : (
              <div className="col-span-2 flex h-14 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 text-sm text-slate-500">
                共用部分データなし
              </div>
            )}
            {maxRooms > 2 &&
              Array.from({ length: maxRooms - 2 }).map((_, index) => (
                <div
                  key={`shared-empty-${index}`}
                  className="h-14 rounded-lg border border-dashed border-slate-200 bg-transparent"
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-slate-100 p-3 text-slate-900">
      <div className="mx-auto grid h-full max-w-7xl grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_224px]">
        <div className="flex min-h-0 flex-col gap-3">
          <header className="rounded-xl border border-slate-300 bg-white px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
              Apartment Manager
            </p>
            <h1 className="mt-1 text-xl font-bold">部屋一覧</h1>
          </header>

          <div className="grid min-h-0 flex-1 gap-3 content-start">
            {buildings.map((building) => (
              <BuildingCard key={building.id} building={building} />
            ))}
          </div>
        </div>

        <aside className="flex min-h-0 flex-col rounded-xl border border-slate-300 bg-white p-3">
          <h2 className="text-sm font-semibold text-slate-900">メニュー</h2>
          <div className="mt-3 flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item}
                type="button"
                className="h-12 rounded-lg border border-slate-300 bg-slate-50 px-3 text-left text-sm text-slate-700 hover:bg-slate-100"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-3 min-h-0 flex-1 rounded-lg border border-dashed border-slate-300 bg-slate-50/60 p-3 text-xs text-slate-500">
            その他の操作ボタンやショートカットを配置するスペース
          </div>
        </aside>
      </div>
    </main>
  );
}

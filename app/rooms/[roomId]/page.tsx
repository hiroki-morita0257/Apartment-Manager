import Link from "next/link";
import { notFound } from "next/navigation";
import { repairs, rooms, type Repair } from "@/src/data/mock-data";
import NewRepairModal from "./new-repair-modal";

function formatDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${Number(year)}年${Number(month)}月${Number(day)}日`;
}

function formatAmount(amount: number | null) {
  if (amount === null) {
    return "未入力";
  }

  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getMissingFields(repair: Repair) {
  const missingFields: string[] = [];

  if (repair.amount === null) {
    missingFields.push("金額");
  }

  if (repair.estimateFileKey === null) {
    missingFields.push("見積書");
  }

  return missingFields;
}

export default async function RoomRepairsPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const room = rooms.find((item) => item.id === roomId);

  if (!room) {
    notFound();
  }

  const roomRepairs = repairs
    .filter((repair) => repair.roomId === room.id)
    .sort((a, b) => b.repairedAt.localeCompare(a.repairedAt));
  const yearlyTotals = Object.entries(
    roomRepairs.reduce<Record<string, number>>((totals, repair) => {
      const year = repair.repairedAt.slice(0, 4);
      totals[year] = (totals[year] ?? 0) + (repair.amount ?? 0);
      return totals;
    }, {}),
  ).sort(([yearA], [yearB]) => yearB.localeCompare(yearA));

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
          <header className="rounded-xl border border-slate-300 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">部屋別 修理履歴</p>
            <h1 className="mt-0.5 text-xl font-bold tracking-tight">
              {room.name}
            </h1>

            {room.note && (
              <div className="mt-3 max-w-2xl rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
                <p className="text-xs font-semibold text-slate-500">部屋の補足情報</p>
                <p className="mt-1 text-sm text-slate-700">{room.note}</p>
              </div>
            )}
          </header>

          <Link
            href="/"
            className="inline-flex min-h-[72px] w-4/5 items-center justify-center justify-self-center self-start rounded-lg bg-slate-800 px-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800"
          >
            ← 部屋一覧へ戻る
          </Link>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
          <section aria-labelledby="repair-history-heading">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="repair-history-heading" className="text-lg font-bold">
                修理履歴一覧
              </h2>
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-slate-600">
                  全 {roomRepairs.length}件
                </p>
                <NewRepairModal />
              </div>
            </div>

            {roomRepairs.length === 0 ? (
              <div className="mt-3 rounded-xl border border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
              <p className="font-medium text-slate-700">修理履歴はありません</p>
              <p className="mt-2 text-sm text-slate-500">
                この部屋には、まだ修理履歴が登録されていません。
              </p>
              </div>
            ) : (
              <>
                <div className="mt-3 hidden overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm md:block">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-left">
                      <thead className="bg-slate-700 text-sm text-white">
                        <tr>
                          <th scope="col" className="px-4 py-3 font-semibold">修理年月日</th>
                          <th scope="col" className="px-4 py-3 font-semibold">修理内容</th>
                          <th scope="col" className="px-4 py-3 font-semibold">金額</th>
                          <th scope="col" className="px-4 py-3 font-semibold">見積書</th>
                          <th scope="col" className="px-4 py-3 font-semibold">入力状況</th>
                          <th scope="col" className="px-4 py-3"><span className="sr-only">操作</span></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {roomRepairs.map((repair) => {
                          const missingFields = getMissingFields(repair);
                          const hasMissingFields = missingFields.length > 0;

                          return (
                            <tr key={repair.id} className="hover:bg-slate-50">
                              <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-700">
                                <time dateTime={repair.repairedAt}>{formatDate(repair.repairedAt)}</time>
                              </td>
                              <td className="px-4 py-4 font-semibold text-slate-900">{repair.description}</td>
                              <td className={`whitespace-nowrap px-4 py-4 font-semibold ${repair.amount === null ? "text-amber-800" : "text-slate-900"}`}>
                                {formatAmount(repair.amount)}
                              </td>
                              <td className={`whitespace-nowrap px-4 py-4 text-sm font-medium ${repair.estimateFileKey === null ? "text-amber-800" : "text-slate-700"}`}>
                                {repair.estimateFileKey ? "添付あり" : "未添付"}
                              </td>
                              <td className="px-4 py-4">
                                {hasMissingFields ? (
                                  <div>
                                    <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">未入力あり</span>
                                    <p className="mt-1 text-xs text-amber-800">{missingFields.join("、")}</p>
                                  </div>
                                ) : (
                                  <span className="text-sm text-slate-500">入力済み</span>
                                )}
                              </td>
                              <td className="px-4 py-4 text-right">
                                <Link href={`/rooms/${room.id}/repairs/${repair.id}`} className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg bg-slate-800 px-4 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800">
                                  詳細を見る
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-3 space-y-3 md:hidden">
                  {roomRepairs.map((repair) => {
                const missingFields = getMissingFields(repair);
                const hasMissingFields = missingFields.length > 0;

                return (
                  <article
                    key={repair.id}
                    className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-5">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <time
                            dateTime={repair.repairedAt}
                            className="text-sm font-medium text-slate-600"
                          >
                            {formatDate(repair.repairedAt)}
                          </time>
                          {hasMissingFields && (
                            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                              未入力あり
                            </span>
                          )}
                        </div>

                        <h3 className="mt-2 text-lg font-bold text-slate-900">
                          {repair.description}
                        </h3>

                        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-lg bg-slate-50 px-4 py-3">
                            <dt className="text-xs font-medium text-slate-500">金額</dt>
                            <dd
                              className={`mt-1 font-semibold ${
                                repair.amount === null
                                  ? "text-amber-800"
                                  : "text-slate-900"
                              }`}
                            >
                              {formatAmount(repair.amount)}
                            </dd>
                          </div>
                          <div className="rounded-lg bg-slate-50 px-4 py-3">
                            <dt className="text-xs font-medium text-slate-500">
                              見積書
                            </dt>
                            <dd
                              className={`mt-1 font-semibold ${
                                repair.estimateFileKey === null
                                  ? "text-amber-800"
                                  : "text-slate-900"
                              }`}
                            >
                              {repair.estimateFileKey ? "添付あり" : "未添付"}
                            </dd>
                          </div>
                        </dl>

                        {hasMissingFields && (
                          <p className="mt-3 text-sm text-amber-800">
                            未入力: {missingFields.join("、")}
                          </p>
                        )}
                      </div>

                      <Link
                        href={`/rooms/${room.id}/repairs/${repair.id}`}
                        className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-slate-800 px-5 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800"
                      >
                        修理内容の詳細を見る
                      </Link>
                    </div>
                  </article>
                );
                  })}
                </div>
              </>
            )}
          </section>

          <aside className="space-y-5">
            <section aria-labelledby="yearly-total-heading">
              <h2 id="yearly-total-heading" className="text-lg font-bold">
                年度別 修理金額
              </h2>
              <div className="mt-3 overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
              {yearlyTotals.length > 0 ? (
                <table className="w-full text-left">
                  <thead className="bg-slate-700 text-sm text-white">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">年度</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">合計金額</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {yearlyTotals.map(([year, total]) => (
                      <tr key={year}>
                        <th scope="row" className="px-4 py-4 font-semibold text-slate-800">{year}年</th>
                        <td className="px-4 py-4 text-right font-semibold text-slate-900">{formatAmount(total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-4 py-8 text-center text-sm text-slate-500">集計データはありません</p>
              )}
              <p className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-500">
                金額が未入力の履歴は、合計に含まれていません。
              </p>
              </div>
            </section>

            <nav aria-label="ページメニュー" className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">メニュー</h2>
              <div className="mt-3 flex flex-col gap-3">
                <button type="button" className="min-h-12 rounded-lg border border-slate-400 bg-white px-4 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50">
                  この画面を印刷
                </button>
              </div>
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useId, useState } from "react";

export default function NewRepairModal() {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-800 px-4 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800"
      >
        ＋ 履歴を追加
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="w-full max-w-lg rounded-xl border border-slate-300 bg-white p-5 shadow-xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id={titleId} className="text-xl font-bold text-slate-900">
                  新規修理履歴の入力
                </h2>
                <p id={descriptionId} className="mt-1 text-sm text-slate-600">
                  修理年月日と修理内容を入力してください。
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="閉じる"
                className="flex size-11 shrink-0 items-center justify-center rounded-lg text-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                ×
              </button>
            </div>

            <form className="mt-6 space-y-5" onSubmit={(event) => event.preventDefault()}>
              <div>
                <label htmlFor="repairedAt" className="block text-sm font-semibold text-slate-800">
                  修理年月日 <span className="text-red-700">必須</span>
                </label>
                <input
                  id="repairedAt"
                  name="repairedAt"
                  type="date"
                  required
                  autoFocus
                  className="mt-2 min-h-12 w-full rounded-lg border border-slate-400 bg-white px-3 text-base text-slate-900 outline-none focus:border-slate-700 focus:ring-2 focus:ring-slate-300"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-800">
                  修理内容 <span className="text-red-700">必須</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  placeholder="例：エアコンの室内機から水漏れ"
                  className="mt-2 w-full resize-y rounded-lg border border-slate-400 bg-white px-3 py-3 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-300"
                />
              </div>

              <p className="rounded-lg bg-slate-100 px-3 py-2 text-xs leading-5 text-slate-600">
                保存機能は今後実装します。現在は入力画面の確認のみできます。
              </p>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="min-h-12 rounded-lg border border-slate-400 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled
                  className="min-h-12 cursor-not-allowed rounded-lg bg-slate-300 px-5 text-sm font-semibold text-slate-600"
                >
                  履歴を登録（準備中）
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

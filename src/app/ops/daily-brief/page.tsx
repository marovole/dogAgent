export default function OpsDailyBriefPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-6">每日運營簡報列表</h2>
      <p className="text-slate-600">
        簡報資料會在每日自動化流程執行後生成。
        請查看 <code className="bg-slate-200 px-1 rounded">content/ops/</code> 目錄。
      </p>
      <div className="mt-4 p-4 bg-amber-50 rounded-lg">
        <p className="text-amber-800 text-sm">
          提示：此頁面僅在本地開發或有動態伺服器時可正常列出檔案。
          靜態部署時，請直接存取已知日期的簡報。
        </p>
      </div>
    </div>
  );
}

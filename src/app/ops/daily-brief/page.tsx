import fs from 'fs';
import path from 'path';

export default function OpsDailyBriefPage() {
  const briefsDir = path.join(process.cwd(), 'content', 'ops');
  let briefs: string[] = [];

  if (fs.existsSync(briefsDir)) {
    briefs = fs.readdirSync(briefsDir)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-6">每日運營簡報列表</h2>
      {briefs.length > 0 ? (
        <ul className="space-y-2">
          {briefs.map((brief) => (
            <li key={brief}>
              <a
                href={`/ops/daily-brief/${brief.replace('.json', '')}`}
                className="block rounded-lg bg-white p-4 shadow hover:shadow-md transition-shadow"
              >
                <span className="font-medium text-slate-900">{brief.replace('.json', '')}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-600">目前沒有簡報資料。</p>
      )}
    </div>
  );
}

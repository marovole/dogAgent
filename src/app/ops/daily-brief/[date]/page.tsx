import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import type { OpsBrief } from '@/types/blog';

type Props = {
  params: Promise<{ date: string }>;
};

export default async function OpsDailyBriefDetailPage({ params }: Props) {
  const { date } = await params;
  const briefPath = path.join(process.cwd(), 'content', 'ops', `${date}.json`);

  if (!fs.existsSync(briefPath)) {
    notFound();
  }

  const brief: OpsBrief = JSON.parse(fs.readFileSync(briefPath, 'utf-8'));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <a href="/ops/daily-brief" className="text-primary-600 hover:underline">
          ← 返回簡報列表
        </a>
      </div>

      <h2 className="text-xl font-semibold text-slate-900 mb-2">
        {date} 每日簡報
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        生成時間: {brief.generatedAt}
      </p>

      {brief.topics.map((topic, index) => (
        <div key={index} className="mb-6 border-b border-slate-200 pb-6 last:border-0">
          <h3 className="text-lg font-medium text-slate-900">{topic.title}</h3>
          <p className="mt-2 text-slate-600">{topic.summary}</p>
          {topic.sources.length > 0 && (
            <div className="mt-2">
              <span className="text-sm text-slate-500">來源: </span>
              {topic.sources.map((source, i) => (
                <a
                  key={i}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:underline mr-2"
                >
                  {source.title}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}

      {brief.keyInsights.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-slate-900 mb-2">關鍵洞察</h3>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            {brief.keyInsights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

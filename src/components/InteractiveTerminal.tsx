import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw } from 'lucide-react';

export function InteractiveTerminal() {
  const [history, setHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'aws --version', output: 'aws-cli/2.15.0 Python/3.11.6 Windows/11 botocore/2.4.0' },
    { cmd: 'aws s3 ls', output: '2026-09-24 10:30:15 aws-builder-projects-gcoek\n2026-09-24 11:15:00 hackathon-submissions-prod' },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    let res = '';
    const lower = trimmed.toLowerCase();
    if (lower === 'help') {
      res = 'Available commands: aws s3 ls, aws lambda list, aws bedrock models, status, clear';
    } else if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower.includes('lambda')) {
      res = '{\n  "Functions": [\n    {"FunctionName": "user-auth-service", "Runtime": "nodejs20.x"},\n    {"FunctionName": "ai-summarizer", "Runtime": "python3.11"}\n  ]\n}';
    } else if (lower.includes('bedrock')) {
      res = 'Claude 3.5 Sonnet [READY], Amazon Titan Text G1 [READY], Stable Diffusion XL [READY]';
    } else if (lower.includes('status')) {
      res = '● All AWS services operational. 940+ Builders active in cohort.';
    } else {
      res = `Executed: ${trimmed}\nStatus: 200 OK (Simulated Sandbox Response)`;
    }

    setHistory((prev) => [...prev, { cmd: trimmed, output: res }]);
    setInputVal('');
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl bg-[#0b0416] border border-purple-500/30 overflow-hidden font-mono text-xs shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#140826] border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-zinc-400 text-[11px] ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3 h-3 text-purple-400" /> bash • aws-student-builder-cli
          </span>
        </div>
        <button
          type="button"
          onClick={() => setHistory([])}
          className="text-zinc-500 hover:text-zinc-300 p-1 cursor-pointer"
          title="Clear Terminal"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Output */}
      <div className="p-4 max-h-64 overflow-y-auto space-y-3 text-zinc-300">
        <div className="text-zinc-500 text-[11px]">
          Welcome to AWS Student Builder Cloud Shell. Type <span className="text-[#4ef35e]">help</span> to explore services.
        </div>
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-purple-300">
              <span className="text-[#4ef35e] font-bold">builder@gcoek:~$</span>
              <span>{item.cmd}</span>
            </div>
            <pre className="text-zinc-400 whitespace-pre-wrap pl-4 font-mono leading-relaxed">{item.output}</pre>
          </div>
        ))}
      </div>

      {/* Terminal Input Form */}
      <form onSubmit={handleCommand} className="flex items-center px-4 py-2.5 bg-[#0e051c] border-t border-purple-500/20">
        <span className="text-[#4ef35e] font-bold mr-2">builder@gcoek:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type 'help', 'aws s3 ls', 'aws lambda list'..."
          className="flex-1 bg-transparent text-white focus:outline-none placeholder-zinc-600"
        />
        <button type="submit" className="text-purple-400 hover:text-purple-200 p-1">
          <Play className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

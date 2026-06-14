import React, { useMemo, useState } from "react";
import { records } from "./data";
import "./App.css";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [filterDate, setFilterDate] = useState("09");
  const [filterPage, setFilterPage] = useState(1);

  const dates = [...new Set(records.map((r) => r.date))];
  const pages = [...new Set(records.filter((r) => r.date === filterDate).map((r) => r.page))];

  const searchResults = useMemo(() => {
    const value = keyword.trim();
    if (!value) return [];
    return records.filter((r) => String(r.grossKg).includes(value));
  }, [keyword]);

  //const selected = searchResults[0] || null;

  // const weights = records.map(weight=>weight.grossKg)
  // const result = []
  // const result2 = []
  // weights.forEach(weight=>{
  //   if(!result.includes(weight)){
  //     result.push(weight)
  //   }else{

  //     result2.push(weight)

  //   }

    
  // })

  // console.log(JSON.stringify(result2))

  

  const tableRows = records.filter(
  
    (r) => r.date === filterDate && r.page === Number(filterPage)
  );

  return (
    <div className="app">
      <header className="top">
        <h1>称重账本查询器</h1>
      </header>

      <main className="main">
        <section className="card search-card">
          <label>按毛重查询（kg）</label>

          <div className="search-row">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="请输入毛重，例如：1964"
              inputMode="numeric"
            />
            <button>查询</button>
          </div>

          <div className="chips">
            <span>常用毛重：</span>
            {records.slice(0, 5).map((r) => (
              <button key={r.id} onClick={() => setKeyword(String(r.grossKg))}>
                {r.grossKg}
              </button>
            ))}
          </div>
        </section>

        {searchResults&&searchResults[0] && (
          <section className="card result-card">
            <div className="result-head">
              <h2>查询结果</h2>
              <span>匹配到 {searchResults.length} 条记录</span>
            </div>

         

            {searchResults.map(selected=>(
              <React.Fragment>
                 <div className="source">
                 {selected.date}号 · 第{selected.page}页
               </div>
                <div className="result-grid">
                <Info label="毛重（kg）" value={selected.grossKg} green />
                <Info label="皮重（kg）" value={selected.tareKg} />
                <Info label="净重（kg）" value={selected.netKg} />
                <Info label="单价（元/斤）" value={selected.pricePerJin} />
                <Info label="净重（斤）" value={selected.netJin} />
                <Info label="总价（元）" value={selected.total} red />
              </div>
              <div className="meta">
              <span>日期：{selected.date}号</span>
              <span>页数：第{selected.page}页</span>
              <span>ID：{selected.id}</span>
            </div>
              </React.Fragment>

            ))}

          

       
          </section>
        )}

        {keyword && !searchResults[0] && <div className="empty">没有找到这个毛重</div>}

        <section className="card table-card">
          <div className="table-top">
            <h2>全部记录（共 {tableRows.length} 条）</h2>

            <div className="filters">
              <label>
                日期：
                <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
                  {dates.map((d) => (
                    <option key={d} value={d}>
                      {d}号
                    </option>
                  ))}
                </select>
              </label>

              <label>
                页数：
                <select
                  value={filterPage}
                  onChange={(e) => setFilterPage(Number(e.target.value))}
                >
                  {pages.map((p) => (
                    <option key={p} value={p}>
                      第{p}页
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>毛重</th>
                  <th>皮重</th>
                  <th>净重斤</th>
                  <th>单价</th>
                  <th>总价</th>
                </tr>
              </thead>

              <tbody>
                {tableRows.map((r) => (
                  <tr key={r.id} onClick={() => setKeyword(String(r.grossKg))}>
                    <td className="green-text">{r.grossKg}</td>
                    <td>{r.tareKg}</td>
                    <td>{r.netJin}</td>
                    <td>{r.pricePerJin}</td>
                    <td className="red-text">{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <nav className="bottom">
        <div className="active">首页</div>
        <div>统计<span>开发中</span></div>
        <div>我的<span>开发中</span></div>
      </nav>
    </div>
  );
}

function Info({ label, value, green, red }) {
  return (
    <div className="info">
      <p>{label}</p>
      <strong className={green ? "green-text" : red ? "red-text" : ""}>
        {value}
      </strong>
    </div>
  );
}
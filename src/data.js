export const rawRecords = [
    { id: 1, date: "09", page: 2, grossKg: 1964, tareKg: 1052, pricePerJin: 1.12 },
    { id: 2, date: "09", page: 2, grossKg: 1884, tareKg: 1238, pricePerJin: 1.05 },
    { id: 3, date: "09", page: 2, grossKg: 2122, tareKg: 948, pricePerJin: 1.1 },
    { id: 4, date: "09", page: 2, grossKg: 2194, tareKg: 1048, pricePerJin: 1.05 },
    { id: 5, date: "09", page: 2, grossKg: 2236, tareKg: 1064, pricePerJin: 1.13 },
  
    // 以后继续加：
    // { id: 6, date: "09", page: 1, grossKg: 1986, tareKg: 1052, pricePerJin: 1.12 },
  ];
  
  export const records = rawRecords.map((r) => {
    const netKg = r.grossKg - r.tareKg;
    const netJin = netKg * 2;
    const total = Number((netJin * r.pricePerJin).toFixed(2));
  
    return {
      ...r,
      netKg,
      netJin,
      total,
    };
  });
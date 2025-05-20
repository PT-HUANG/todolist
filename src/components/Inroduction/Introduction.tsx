function Introduction() {
  return (
    <div className="bg-white border border-gray-950 rounded-lg p-4 max-w-[380px] sm:max-w-[675px]">
      <h2 className="text-xl font-semibold mb-4">📌 關於 Tolist</h2>
      <p className="text-sm text-gray-600 leading-relaxed text-justify">
        <strong>Tolist</strong>{" "}
        是一個任務清單管理小工具，支援使用者註冊、登入後建立與管理待辦事項。
        <br></br>
        此專案以 <strong>React</strong> + <strong>Tailwind CSS</strong>{" "}
        開發，展示切版、UI 組件拆分與 React 狀態管理等方面的實作能力。
        <br></br>
        使用者註冊、資料儲存與網站部署皆透過 <strong>Firebase</strong> 完成。
      </p>
    </div>
  );
}

export default Introduction;

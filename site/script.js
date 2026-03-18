let allData = []; // 存储原始数据

fetch("data/leaderboard.json")
    .then(res => res.json())
    .then(json => {
        allData = json;
        // 初始默认按 AUC 降序排列
        allData.sort((a, b) => b.AUC - a.AUC);
        renderTable(allData);
    });

function renderTable(rows) {
    const tbody = document.querySelector("#leaderboard tbody");
    tbody.innerHTML = "";

    rows.forEach((d, i) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td><strong>${d.detector}</strong></td>
            <td>${d.organization}</td>
            <td>${d.AUC.toFixed(3)}</td>
            <td>${d.F1.toFixed(3)}</td>
            <td><span class="badge">${d.dataset}</span></td>
            <td><a href="${d.paper}" target="_blank">📄</a></td>
            <td><a href="${d.code}" target="_blank">💻</a></td>
        `;
        tbody.appendChild(tr);
    });
}

// 综合搜索与筛选功能
function filterData() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const datasetFilter = document.getElementById("datasetFilter").value;

    const filtered = allData.filter(d => {
        const matchesSearch = d.detector.toLowerCase().includes(searchTerm) || 
                              d.organization.toLowerCase().includes(searchTerm);
        const matchesDataset = datasetFilter === "all" || d.dataset === datasetFilter;
        return matchesSearch && matchesDataset;
    });

    renderTable(filtered);
}

function sortTable(metric) {
    // 简单的升降序切换逻辑（可选）
    allData.sort((a, b) => {
        if (typeof a[metric] === 'string') {
            return a[metric].localeCompare(b[metric]);
        }
        return b[metric] - a[metric];
    });
    filterData(); // 排序后重新应用当前的搜索和筛选
}
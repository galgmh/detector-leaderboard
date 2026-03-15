let data=[]

fetch("data/leaderboard.json")
.then(res=>res.json())
.then(json=>{

data=json

data.forEach(d=>{
d.score=(d.AUC+d.F1)/2
})

renderTable(data)

})

function renderTable(rows){

let tbody=document.querySelector("#leaderboard tbody")
tbody.innerHTML=""

rows.forEach((d,i)=>{

let tr=document.createElement("tr")

tr.innerHTML=`
<td>${i+1}</td>
<td>${d.detector}</td>
<td>${d.organization}</td>
<td>${d.AUC.toFixed(3)}</td>
<td>${d.F1.toFixed(3)}</td>
<td>${d.dataset}</td>
<td><a href="${d.paper}" target="_blank">paper</a></td>
<td><a href="${d.code}" target="_blank">code</a></td>
`

tbody.appendChild(tr)

})

}

function sortTable(metric){

data.sort((a,b)=>b[metric]-a[metric])

renderTable(data)

}

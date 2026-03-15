let data=[]

fetch("../data/leaderboard.json")
.then(r=>r.json())
.then(json=>{

data=json

data.forEach(d=>{
d.score=(d.AUC+d.F1)/2
})

render(data)

})

function render(rows){

let tbody=document.querySelector("#leaderboard tbody")
tbody.innerHTML=""

rows
.sort((a,b)=>b.score-a.score)
.forEach((d,i)=>{

let tr=document.createElement("tr")

tr.innerHTML=`
<td>${d.detector}</td>
<td>${d.organization}</td>
<td>${d.AUC.toFixed(3)}</td>
<td>${d.F1.toFixed(3)}</td>
<td>${d.score.toFixed(3)}</td>
<td>${d.dataset}</td>
<td><a href="${d.paper}">paper</a></td>
<td><a href="${d.code}">code</a></td>
`

tbody.appendChild(tr)

})

}

function sortTable(key){

data.sort((a,b)=>b[key]-a[key])

render(data)

}
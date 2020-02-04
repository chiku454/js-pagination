var data = [];
function fetchAPI(){
  const url = 'https://api.myjson.com/bins/xkmgh'
    fetch(url) 

    .then(res => {return res.json()})
    .then(res => {
      data = res;
      pagination(res)
    })
    .catch(function(err) {
      console.log(err)
        // This is where you run code if the server returns any errors
    });
}
  
var pageIndex = 0;
var pageSize = 10;

fetchAPI();

function drawTable(paginateData){
    let table = document.createElement('table');
    table.id = 'main-table' 
    let tBody = document.createElement('tbody');
    table.appendChild(tBody);
    var tHeading = paginateData[0];
    const trH = document.createElement('tr');
    for(let key in tHeading){
        let th = document.createElement('th');
        let thText = document.createTextNode(key.toUpperCase());
        th.appendChild(thText)
        trH.appendChild(th)
    }
    tBody.appendChild(trH);
    table.appendChild(tBody)    
    for(let i = 0; i < paginateData.length ; i ++){
     
       tBody.appendChild(drawTrs(paginateData[i]));
    }
    return table
}
function pagination(data){
  var count = 1;
  var pageIndexDraw = [];
  var demoData = [];
  for(let i =0 ; i< pageSize ; i++){
    demoData.push(data[i]);
  }
  for(var i = 0; i < data.length ;){
    if(data.length - i >= pageSize ){
      if(i === 0){
        pageIndexDraw.push('First Node');
      } 
      pageIndexDraw.push(count++)
      if(data.length - i <  count ){
        pageIndexDraw.push('Last Node');
      }
      console.log('data.length', data.length - i, count)
      i = i + pageSize;
    }else{
      // pageIndexDraw.push(count)
      break;
    }
  }

  let div = document.createElement('div');
  div.style.width = '100%';
  div.style.display = "flex";
  div.style.justifyContent = "center"
  
  pageIndexDraw.forEach((el) => {
    let innerDiv = document.createElement('div');
    // if(el === 1) {
    //   let firstDiv = document.createElement('div');
    // firstDiv.appendChild(document.createTextNode('First Node'))
    // firstDiv.addEventListener(
    //   'click', function(){
    //     demoData =[];
    //     var element = document.getElementById("main-table");
    //     element.parentNode.removeChild(element)
    //     for(let i = 0 ; i < pageSize ; i ++ ){
    //       demoData.push(data[i]);
    //   }
    //   console.log('here', demoData)
    //   }
    // );
    // innerDiv.appendChild(firstDiv)
    // }
    innerDiv.classList.add("paginationBoxStyle")
    let innerText = document.createTextNode(el);
    innerDiv.appendChild(innerText)
    innerDiv.addEventListener('click', function(){
        demoData =[];
        var element = document.getElementById("main-table");
        el = el === "First Node" ? 1 : el === "Last Node" ? pageIndexDraw.length  : el; 

        element.parentNode.removeChild(element)
        for(let i = el * pageSize ; i < (el * pageSize < data.length ? (el * pageSize + pageSize): data.length) ; i ++ ){
          demoData.push(data[i])
        }
        document.getElementById('table').appendChild(drawTable(demoData));
    })
    div.appendChild(innerDiv)
  })
  document.getElementById('table').appendChild(div)
  document.getElementById('table').appendChild(drawTable(demoData));

}
function drawTrs(data){
    const tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tidText= document.createTextNode(data && data._id);
    tdId.appendChild(tidText);
    tr.appendChild(tdId);

    let tdName = document.createElement('td');
    let tdTextName= document.createTextNode(data && data.name);
    tdName.appendChild(tdTextName);
    tr.appendChild(tdName);

    let tdtype = document.createElement('td');
    let tdTexttype= document.createTextNode(data && data.type);
    tdtype.appendChild(tdTexttype);
    tr.appendChild(tdtype);

    let tdcompany = document.createElement('td');
    let tdTextcompany= document.createTextNode(data && data.company);
    tdcompany.appendChild(tdTextcompany);
    
    tr.appendChild(tdcompany);
    return tr;
}
function drawTableInput(){
  var value = document.getElementById('name').value 
  let demoData = [];
   value ? data && data.forEach((unit) => {
    if(unit.name.toLowerCase().indexOf(value.toLowerCase()) !== -1){
      demoData.push(unit);
    }
  }) : demoData = data;
  if(demoData && demoData.length){
    document.getElementById("table").innerHTML = '';
    pagination(demoData)
  }else{
    document.getElementById("table").innerHTML = "No Result Found"
  }
}

let title =document.getElementById('title');
let price =document.getElementById('price');
let tax =document.getElementById('tax');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let count =document.getElementById('count');
let category =document.getElementById('category');
let total = document.getElementById('total');
let create = document.getElementById('create')
let mood = "create";
let tmp;

//getTotal
function getTotal(){
    if(price.value != "") {
        let result = (+price.value + +tax.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
        total.style.color = '#fff';
    }
    else{
        total.innerHTML = "";
        total.style.backgroundColor = '#840101';
        total.style.color = '#fff';
    }
}

//create product
let dataPro ;
if(localStorage.getItem('product') !=null)
{
    dataPro = JSON.parse(localStorage.getItem('product'));
}else{
    dataPro = [];
}


create.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        tax:tax.value,
        price:price.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value.toLowerCase(),
        total:total.innerHTML,
    }
    if(title.value !='' && category.value != "" && price.value != '' && count.value < 100 ) 

        { 
            clearData();

            if ( mood === "create" ){
            if(newPro.count > 1){

        for(let i =0 ; i < newPro.count ; i++)
        {
            dataPro.push(newPro);

        }
    }
    else{    dataPro.push(newPro); }

    }
    else{
        dataPro[tmp] = newPro ;
        mood = "create";
        create.innerHTML = " Create";
        count.style.display = "block";
    }
}
 

    localStorage.setItem('product' , JSON.stringify(dataPro))

    readData();
}

//clear inputs 

function clearData(){
        title.value = "";
       tax.value = '';
      price.value = '';
        ads.value = '';
       discount.value ='';
       count.value = '';
        category.value = '';
       total.innerHTML = '';
}

//read data

function readData(){

    let table = '';
   for(let i = 0 ; i< dataPro.length ; i++){
         table +=  `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick = "updateData(${i})" class="update">update</button></td>
            <td><button onclick ="deleteData(${i})" class="delete">delete</button></td>
        </tr>                        
              

    `
    }

    document.getElementById('tbody').innerHTML = table;


    let btn_delete = document.getElementById('deleteAll')
    if(dataPro.length > 0){
        btn_delete.innerHTML = `
        <button class = "btn_1" onclick = "deleteAll()" >DeleteAll (${dataPro.length})</button>`
    }
    else{
        btn_delete.innerHTML = "";
    }


    getTotal();
}
readData();

//delete 

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    readData();
}

function deleteAll(){
localStorage.clear();
dataPro.splice(0)
readData();


}


//update

function updateData(i){

    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    ads.value = dataPro[i].ads;
    tax.value = dataPro[i].tax;
    category.value = dataPro[i].category;
    discount.value = dataPro[i].discount;
    count.style.display = "none";
    create.innerHTML = "Update"
    mood = "update";
    tmp = i;
    getTotal();
    scroll({
        top:0,
        behavior:"smooth",
    
    });



}




// getSearchMood 

let SearchMood = "title";

function getSearchMood(id){
    let search = document.getElementById("search");

    if( id == "SearchTitle")
    {
        SearchMood = "title";
    }
    else{
        SearchMood = "category";

    }
    search.placeholder = "Search By" +" "+ SearchMood;

    readData(); 
    search.value = "";
    search.focus();

} 

function getDataSearch(value){
    let table = "";
    for(let i = 0 ; i<dataPro.length ; i++){
    if(SearchMood == "title"){
        {

            if(dataPro[i].title.includes(value.toLowerCase()))
            {
                table +=  `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick = "updateData(${i})" class="update">update</button></td>
                    <td><button onclick ="deleteData(${i})" class="delete">delete</button></td>
                </tr>                        
                      
        
            `
            }
        }
    }
    else if( SearchMood == "category"){

        if(dataPro[i].category.includes(value.toLowerCase()))
        {
            table +=  `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick = "updateData(${i})" class="update">update</button></td>
                <td><button onclick ="deleteData(${i})" class="delete">delete</button></td>
            </tr>                        
                  
    
        `
        }

    }

    }

    document.getElementById('tbody').innerHTML = table;

}

    




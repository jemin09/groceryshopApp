let productJson=[
    {prodcode:"PEP122",prodname:"Pepsi","price":12,"category":"Food","offer":"10%"},
	{prodcode:"COK238",prodname:"Coke","price":15,"category":"Food","offer":"15%"},
	{prodcode:"MIR411",prodname:"Mirinda","price":30,"category":"Food","offer":"20%"},
	{prodcode:"RB0277",prodname:"Red Bull","price":80,"category":"Food","offer":"None"},
	{prodcode:"LUX831",prodname:"Lux","price":10,"category":"Soap","offer":"15%"},
	{prodcode:"DOV672",prodname:"Dove","price":25,"category":"Soap","offer":"20%"},
	{prodcode:"DET810",prodname:"Dettol","price":15,"category":"Soap","offer":"None"},
	{prodcode:"PAN590",prodname:"Pantene","price":60,"category":"Shampoo","offer":"None"},
	{prodcode:"SUN677",prodname:"Sunsilk","price":48,"category":"Shampoo","offer":"15%"},
	{prodcode:"GAR004",prodname:"Garnier","price":75,"category":"Shampoo","offer":"10%"}
];
let prodcodeopt=["PEP122","COK238","MIR411","RB0277","LUX831","DOV672","DET810","PAN590","SUN677","GAR004"];
let loctionOpt=['Sector	14A','Sector 15B','Sector 22','Pioneer Chowk'];
let slotopt=['Before 10AM','10AM-12PM','12PM-2PM','2PM-4PM','4PM-6PM','After 6PM'];
let quantityopt=[1,2,3,4,5,6];
let Newproduct=[];

function showallproduct(){
    showallproductTable(productJson);
}
function showallproductTable(productJson){
    const arr1=productJson.map((ele)=>{
        let index=productJson.findIndex(pr=>{
            return pr.prodcode==ele.prodcode;
        })
        if(index%2==0){
            let str='<tr class="td1">';
        str+='<td class="td1">'+ele.prodcode+'</td>';
        str+='<td class="td1">'+ele.prodname+'</td>';
        str+='<td class="td1">'+ele.price+'</td>';
        str+='<td class="td1">'+ele.category+'</td>';
        str+='<td class="td1">'+ele.offer+'</td>';
        str+='<tr>';
       //  console.log(str);
        return str;
        }
        else{
            let str='<tr class="td1">';
        str+='<td class="td2">'+ele.prodcode+'</td>';
        str+='<td class="td2">'+ele.prodname+'</td>';
        str+='<td class="td2">'+ele.price+'</td>';
        str+='<td class="td2">'+ele.category+'</td>';
        str+='<td class="td2">'+ele.offer+'</td>';
        str+='<tr>';
       //  console.log(str);
        return str;
        }
    });
     let header='<tr>';
    header+='<th class=\'th1\' onclick=\'sort(0)\'>Code</th>';
    header+='<th class=\'th1\' onclick=\'sort(1)\'>Name</th>';
    header+='<th class=\'th1\' onclick=\'sort(2)\'>Price</th>';
    header+='<th class=\'th1\' onclick=\'sort(3)\'>category</th>';
    header+='<th class=\'th1\' onclick=\'sort(4)\'>Discount</th>';
    header+='</tr>';
    let html='<table class=\'table1\'>'+header+arr1.join('')+'</table>';
   //  console.log(html);
    let element=document.getElementById('ShowTable');
    element.innerHTML=html;
}

//All order
let orderjson=[
    {"custname":"Jack Smith","mobile":"425361434","location":"Sector 14","slot":"12PM-2PM","value":72.6,
    "items":[{"prodcode":"PEP122","quantity":2},
    {"prodcode":"COK238","quantity":4}]},
    {"custname":"Mary Gomes","mobile":"723476123","location":"Sector 22","slot":"4PM-6PM","value":130.60,
    "items":[{"prodcode":"SUN677","quantity":2},
    {"prodcode":"LUX831","quantity":4},
    {"prodcode":"DET810","quantity":1}]},
    {"custname":"Tim May","mobile":"835099614","location":"Pioneer Chowk","slot":"Before 10AM","value":705,
    "items":[{"prodcode":"GAR004","quantity":6},
    {"prodcode":"RB0277","quantity":3},
    {"prodcode":"MIR411","quantity":2}]}
];

function showAllorder(){
    let arr1=orderjson.map(or=>{
        // console.log(orderjson);
        let itemsjson=or.items;
        let totalItem=0;
        let totalvalue=0;
        let str=' Customer Name : '+or.custname;
        str+='  Mobile : '+or.mobile;
        str+='  Location : '+or.location;
        str+='  Delivery Slot : '+or.slot;
        

        let itemarr=itemsjson.map(it=>{
            let str='<tr class="td1">';
            str+='<td class="td1">'+it.prodcode+'</td>';           
            let prevprod=productJson.find(pr=>{
                return pr.prodcode==it.prodcode;
            });
            // console.log(prevprod);
            let dis=prevprod.offer=='None'?1:prevprod.offer;
            let disNum=(dis==1?1:dis.replace('%',''));
            // console.log(disNum);
            let totalpri=prevprod.price*it.quantity*(disNum/100);
            // console.log(totalpri);
            let netamount=prevprod.price*it.quantity-totalpri;
            let qty=(it.quantity)*1;
            totalItem+=qty;  
            totalvalue+=(1*netamount); 
            str+='<td class="td1">'+prevprod.prodname+'</td>'; 
            str+='<td class="td1">'+prevprod.price+'</td>';
            str+='<td class="td1">'+it.quantity+'</td>';
            str+='<td class="td1">'+prevprod.offer+'</td>';
            str+='<td class="td1">'+netamount+'</td>';
            str+='<tr>';
           //  console.log(str);
            return str;
        });
        // console.log(totalItem);
        
        str+='  Order Value : '+totalvalue;
        str+='  Number of items : '+totalItem;
        let header='<tr>';
        header+='<th class=\'th1\' onclick=\'sort(0)\'>Code</th>';
        header+='<th class=\'th1\' onclick=\'sort(1)\'>Name</th>';
        header+='<th class=\'th1\' onclick=\'sort(2)\'>Price</th>';
        header+='<th class=\'th1\' onclick=\'sort(3)\'>Quantity</th>';
        header+='<th class=\'th1\' onclick=\'sort(4)\'>Discount</th>';
        header+='<th class=\'th1\' onclick=\'sort(4)\'>Net Amount</th>';
        header+='</tr>';
        let html=str+'<table class=\'table1\'>'+header+itemarr.join('')+'</table>';
        return html;
        });
        let html='<table>'+arr1.join('')+'</table>';
        let element=document.getElementById('ShowTable');
        element.innerHTML=html;
        Newproduct=[];
}

//enter a order

function enterAnOrder(){
    let str='Customer Name <input type="text" id="name1"><br><br>';
    str+='Mobile Number <input type="text" id="phn" ><br><br>';
    str+='Locaton '+makeCodeDD('loc',loctionOpt,'Choose Location','')+'<br><br>';
    str+='Delivery Slot'+makeCodeDD('del',slotopt,'Choose Delivery','')+'<br><br>';
    str+='Add to order'+makeCodeDD('code',prodcodeopt,'Select product','');
    str+=makeCodeDD('qty',quantityopt,'Select quantity','');
    str+='<button class="Btn" onclick="addAnOrder()">Add to Order</button><br><br>';
    str+='<button class="Btn" onclick="addnewOrdertoAllOrder()">Order Complete</button>';
    str+='<button class="Btn" onclick="cancelorder()">Cancel Order</button><br><br>';



    const arr1=Newproduct.map((ele)=>{
        let str='<tr class="td1">';
        str+='<td class="td1">'+ele.Code+'</td>';
        str+='<td class="td1">'+ele.name+'</td>';
        str+='<td class="td1">'+ele.price+'</td>';
        str+='<td class="td1">'+ele.quantity+'</td>';
        str+='<td class="td1">'+ele.discount+'</td>';
        str+='<td class="td1">'+ele.netamount+'</td>';
        str+='<td class="td1"><button class="Btn" onclick=remove("'+ele.Code+'")>Remove</button></td>';
        str+='<tr>';
       //  console.log(str);
        return str;
    });
     let header='<tr>';
    header+='<th class=\'th1\' onclick=\'sort(0)\'>Code</th>';
    header+='<th class=\'th1\' onclick=\'sort(1)\'>Name</th>';
    header+='<th class=\'th1\' onclick=\'sort(2)\'>Price</th>';
    header+='<th class=\'th1\' onclick=\'sort(3)\'>Quantity</th>';
    header+='<th class=\'th1\' onclick=\'sort(4)\'>Discount</th>';
    header+='<th class=\'th1\' onclick=\'sort(4)\'>Net Amount</th>';
    header+='<th class=\'th1\' onclick=\'sort(4)\'></th>';
    header+='</tr>';
    let html=str+'<table class=\'table1\'>'+header+arr1.join('')+'</table>';
   //  console.log(html);
    let element=document.getElementById('ShowTable');
    element.innerHTML=html;
}

function makeCodeDD(id,arr,first,selVal){
    const arr1=arr.map(function(opt){
        if(opt==selVal)
            return '<option selected>'+opt+'</option>';
        else
            return '<option>'+opt+'</option>';
    });
    let header='<option>'+first+'</option>';
    if(selVal=='')
        header='<option>'+first+'</option>';
    
    let s1='<select id=\''+id+'\'>'+header+arr1.join('')+'</select>';
    return s1;
}



function addAnOrder(){
    let st={};
    let orderCode=document.getElementById('code').value;
    let qty=document.getElementById('qty').value;
    // console.log(orderCode);
    let index=Newproduct.findIndex(p=>{
        return p.Code==orderCode;
    });
    if(index>=0){
        console.log('for same product');
        let arr=Newproduct.find(p=>{        
            return p.Code==orderCode;
         });
         console.log('in same pro arr',Newproduct);
         console.log('in same pro arr',arr);
         if(qty=='Select quantity'){
            alert('Enter quantity');
         }else{
            console.log(arr);
            let qty1=(1*arr.quantity)+(1*qty);
            let dis=arr.discount=='None'?1:arr.discount;
            let disNum=(dis==1?1:dis.replace('%',''));
            // console.log(disNum);
            let totalpri=arr.price*qty1*(disNum/100);
            // console.log(totalpri);
            let netamount=arr.price*qty-totalpri;
            
            arr.Code=arr.Code;
            arr.name=arr.name;
            arr.price=arr.price;
            arr.quantity=qty1;
            arr.discount=arr.discount;
            arr.netamount=netamount;
            console.log('in st',st);
            // Newproduct.push(st);
            enterAnOrder();
         }
    }
    else{
        let arr=productJson.find(p=>{        
            return p.prodcode==orderCode;
         });
         if(qty=='Select quantity'){
            alert('Enter quantity');
         }else{
            let dis=arr.offer=='None'?1:arr.offer;
            let disNum=(dis==1?1:dis.replace('%',''));
            // console.log(disNum);
            let totalpri=arr.price*qty*(disNum/100);
            // console.log(totalpri);
            let netamount=arr.price*qty-totalpri;
            
            st['Code']=orderCode;
            st['name']=arr.prodname;
            st['price']=arr.price;
            st['quantity']=qty;
            st['discount']=arr.offer;
            st['netamount']=netamount;
            // console.log('in st',st);
            Newproduct.unshift(st);
            enterAnOrder();
         }
    }     
     
    //  console.log(arr);
}

function remove(code){
    console.log('hi in remove',code);
    let index=Newproduct.findIndex(p=>{
        return p.code==code;
    })
    console.log('the index=',index);
    Newproduct.splice(index,1);
    enterAnOrder();
}

// add new orde
function addnewOrdertoAllOrder(){
    let st={};
    let st1={};
    
    let items=orderjson.items;
    let custname=document.getElementById('name1').value;
    let mobile=document.getElementById('phn').value;
    let location=document.getElementById('loc').value;
    let slot=document.getElementById('del').value;
    let arr=Newproduct.map(np=>{  
        st1={};
        // console.log(np);      
        st1['prodcode']=np.Code;
        st1['quantity']=np.quantity;       
        return st1;
    })
    

    if(custname==''||mobile==''||location=='Choose Location'||
    slot=='Choose Delivery'||arr=='' || mobile.length!==10 || isNaN(mobile)){
        console.log('not mobile',mobile.length);
        if(custname==''){
            alert('Enter name');
        }
        else if(location=='Choose Location'){
            alert('Enter location');
        }
        else if(slot=='Choose Delivery'){
            alert('Enter Delivery slot');
        }
        else if(arr==''){
            alert('Enter atleast one order');
        }
        else if(mobile==''){
            alert('Enter mobile number');
        }
        else if(mobile.length!==10){
            alert('phone no shouldbe 10 digit');
        }
        else if(isNaN(mobile)){
            alert('Mobile numbers should have digits only');
        }
        
    }else{
        st['custname']=custname;
        st['mobile']=mobile;
        st['location']=location;
        st['slot']=slot;
        // console.log(mobile.length);
        
        // console.log(arr);
        st['items']=arr;
        // console.log(st);
        orderjson.unshift(st);
        console.log(orderjson);
        showAllorder();
    } 
    
}

function cancelorder(){
    Newproduct=[];
    enterAnOrder();
}
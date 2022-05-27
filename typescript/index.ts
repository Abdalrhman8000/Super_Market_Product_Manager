//============ Mode Ui Colors ===============>
enum LightMode{
    main_ligth_color = '#fff',
    main_color = '#242b3d',
    primary_color = '#596174',
}
enum DarkMode{
    main_dark_color = '#242b3d',
    main_color = '#556ee6',
    primary_color = '#778BEB'
}
//============ Mode Ui Colors ===============>

//============ Mode Controller ===============>
class Mode{
    //============ Set Var ===============>
    img:NodeListOf<HTMLImageElement>;
    active:string;
    //============ Set Var ===============>
    constructor(){
        this.img = document.querySelectorAll('.mode img');
        this.active = 'active_mode';
    }
    ChangeIconMode():void{
    //============ Check Mode And Appending ===============>
        this.img[0].addEventListener('click',(e) => {
            const ele =e.target as HTMLElement;
            ele.classList.remove(this.active);
            this.img[1].classList.add(this.active)
            this.ChangeLightMode();
        })
    //============ Check Mode And Appending ===============>
        this.img[1].addEventListener('click',(e) => {
            const ele =e.target as HTMLElement;
            ele.classList.remove(this.active);
            this.img[0].classList.add(this.active)
            this.ChangeDarkMode();
        })
    }
    //============ Set Light Mode ===============>
    ChangeLightMode():void{
        document.documentElement.style.setProperty('--background_color',LightMode.main_ligth_color);
        document.documentElement.style.setProperty('--active_color',LightMode.main_color);
        document.documentElement.style.setProperty('--light_color',LightMode.primary_color);
        document.documentElement.style.setProperty('--light',DarkMode.main_dark_color);
    }
    //============ Set Dark Mode ===============>
    ChangeDarkMode():void{
        document.documentElement.style.setProperty('--background_color',DarkMode.main_dark_color);
        document.documentElement.style.setProperty('--active_color',DarkMode.main_color);
        document.documentElement.style.setProperty('--light_color',DarkMode.primary_color);
        document.documentElement.style.setProperty('--light',LightMode.main_ligth_color);
    }
}
const mode = new Mode();
mode.ChangeIconMode();
//============ Mode Controller ===============>

//============ Input Total Price Handeler ===============>
class Calc{
    inputs:NodeListOf<HTMLInputElement>;
    constructor(){
        this.inputs = document.querySelectorAll(".cont input");
    }
    Input():void{
        this.inputs.forEach(ele => {
            ele.addEventListener('input',() =>{
                this.Calcer();
            })
        })
    }

    Calcer():void{
        this.inputs[2].addEventListener('input',(e) => {
            const ele = e.target as HTMLInputElement;
            const num:number = parseInt(this.inputs[1].value);
            const price:number = +ele.value;
           if(price && num){
            this.inputs[3].value =  `${(price * num).toString()}$`;
           }
        })
        this.inputs[1].addEventListener('input',(e) => {
            const ele = e.target as HTMLInputElement;
            const num:number = parseInt(this.inputs[2].value);
            const price:number = +ele.value;
            if(price && num){
                this.inputs[3].value =  `${(price * num).toString()}$`;
            }
        })
    }
}
const data = new Calc();
data.Input();
//============ Input Total Price Handeler ===============>


//============ Set Data ===============>
class DataSter extends Calc{
    inputs:NodeListOf<HTMLInputElement>;
    btn:HTMLElement;
    array_of_data:{}[];
    tbody:HTMLElement;
    select:HTMLSelectElement;
    constructor(){
        super();
        this.inputs = document.querySelectorAll('.cont input');
        this.btn = document.querySelector('.cont button')!;
        this.tbody = document.querySelector('.tb_parent table tbody')!;
        this.select = document.querySelector('select')!;
        this.array_of_data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')!) : [];
    }
    //========= SetData At LocalStorage =============>
    SetData(data:object[]){
        //========== Set Data At LocalStorage ============>
        localStorage.setItem('data',JSON.stringify(data));
        location.reload();
    }
    //========= Draw Ui Data =============>
    DrawDataUi(){
      //========== Make Object Data From Inputs to LocalStorage ============>
        const data:{
            productname:string,
            prodcuttype:string,
            productcount:number,
            productprice:number,	
            producttotalprice:string,
            productdate:string,
            id:number
        }={
            productname:this.inputs[0].value,
            prodcuttype:this.select.value,
            productcount:+this.inputs[1].value,
            productprice:+this.inputs[2].value,	
            producttotalprice:this.inputs[3].value,
            productdate:this.inputs[4].value,
            id:Math.random()
        }
      //========== Make Object Data From Inputs to LocalStorage ============>
      
      //========== Send Data To LocalStorage ============>
      this.array_of_data.push(data);
      this.SetData(this.array_of_data);
      //========== Send Data To LocalStorage ============>
    }
    //========= Test Data And Sent To Draw =============>
    SendData(){
        let tester:HTMLElement[] = [];
        this.btn.addEventListener('click',() => {
            tester = Array.from(this.inputs).filter(ele => ele.value !== '');
            if(tester.length == this.inputs.length){

                //========== Send Data after Testing ============>
                this.DrawDataUi();
                //========== Send Data after Testing ============>

                //========== Draw Ui ============>
                this.DrawUi();
                //========== Draw Ui ============>

                //========== Clear Data Tester ============>
                Array.from(this.inputs).forEach(ele => {
                    ele.value = '';
                })
                tester = [];       
               //========== Clear Data Tester ============>
            }else{
                window.alert('Please Enter Reall Value');
            }
        })


    }
    //========= Append Data At Tbody =============>
    DrawUi(){
        if(this.array_of_data.length > 0){
               //======== Clear Data Before Append ===============>
                this.tbody.innerText = '';
                this.array_of_data.forEach((ele:any,index:number) => {
                //======== Append Data ===============>
                    this.tbody.innerHTML += `
                    <tr>
                        <td>#${index+1}</td>
                        <td id = "name">${ele.productname}</td>
                        <td>${ele.prodcuttype}</td>
                        <td>${ele.productcount}</td>
                        <td>${ele.productprice}</td>
                        <td>${ele.producttotalprice}</td>
                        <td>${ele.productdate}</td>
                        <td>
                            <div class="controlls flex_eve">
                                <img src="./images/edit.png" alt="" class = "edit">
                                <img src="./images/delete.png" alt="" class = "delete">
                                <span class = 'hide'>${ele.id?ele.id:Math.random()}</span>
                            </div>
                        </td>
                    </tr>
                    `;
                //======== Append Data ===============>
            })
        }
    }
}
const dataster = new DataSter();
dataster.SendData();
//============ Set Data ===============>

//============ DataEditer ===============>
class DataEditer extends DataSter{
    edit_form:HTMLElement;
    edit_form_inputs:NodeListOf<HTMLInputElement>;
    form_closer:HTMLElement;
    btn:HTMLInputElement;
    select:HTMLSelectElement;
    constructor(){
        super();
        this.inputs = document.querySelectorAll('form input');
        this.btn = document.querySelector('form button')!;
        this.select = document.querySelector('form select')!;
        this.edit_form = document.querySelector('form')!;
        this.edit_form_inputs = document.querySelectorAll('form input');
        this.form_closer = document.querySelector('form .close')!;
    }
// ========= Delet Row From Table and LocalStorage =============>
    Deleter(data:NodeListOf<HTMLElement>){
        //============ Filter_Data_And_Delete ===============>
        data.forEach(ele => {
            ele.addEventListener('click',(e:any) => {
                const ele = e.target.parentNode.parentNode.parentNode;
                const id = +e.target.nextElementSibling.innerText;
                const data = JSON.parse(localStorage.getItem('data')!);
                //====== Filter Data =======>
                const currentData = data.filter((ele:any) => ele.id !== id);
                //====== Delete Data After Filter  =======>
                this.SetData(currentData);
                ele.remove();
            })
        })
      //============ Filter_Data_And_Delete ===============>
    }
// ========= Edit Row From Table and LocalStorage =============>
    Filter_Data(data:NodeListOf<HTMLElement>):void{       
        //========= Loop To Add Event Show Form To Editing ===========> 
        data.forEach(ele => {
            ele.addEventListener('click',(e:any)=>{
                //====== Get ID From Span To Filter Data =====>
                const id_confirm = +e.target.nextElementSibling.nextElementSibling.innerText;
                //====== Get Data From LocalStorage =====>
                const ele_data = JSON.parse(localStorage.getItem('data')!);
                //====== Filter Data From LocalStorage =====>
                const ele_filter_data = ele_data.filter((ele:any) => ele.id == id_confirm);                
                 //====== Show Form To Edit Data =======>
                this.edit_form.classList.toggle('active_form');
                //======  Send Data ================>
                this.Append_Data(ele_filter_data);
            })
        })    
        //======== Close Form Event ===========> 
        this.form_closer.addEventListener('click',() => {
            this.edit_form.classList.remove('active_form');
        })           
        //======== Editer Data ===========> 
    }
// ========= Append Data At Form To Edit =============>
    Append_Data(data:any):void{
        //=========== Appen Data At Form To Edit ===========>
       this.edit_form_inputs[0].value = data[0].productname;
       this.select.value = data[0].prodcuttype;
       this.edit_form_inputs[1].value = data[0].productcount;
       this.edit_form_inputs[2].value = data[0].productprice;
       this.edit_form_inputs[3].value = data[0].producttotalprice;
       this.edit_form_inputs[4].value = data[0].productdate;
       //=========== Appen Data At Form To Edit ===========>

       //========= Send Data To Edit =========>    
       this.Editer(data);
    }
// ========= Edit And Appen New Data  =============>
    Editer(data:any){
        //======== Filter Data Before Appending =============>
        const ele_data = JSON.parse(localStorage.getItem('data')!);
        const ele_filter_data = ele_data.filter((ele:any) => ele.id != data[0].id);
        const currentData = data.concat(ele_filter_data);
        //======== Filter Data Before Appending =============>
        this.btn.addEventListener('click',(e:any) => {
        //=========== Add Data To Local Storage After Edit ==============>
        data[0].productname = this.edit_form_inputs[0].value;
        data[0].prodcuttype = this.select.value ;
        data[0].productcount = this.edit_form_inputs[1].value;
        data[0].productprice = this.edit_form_inputs[2].value;
        data[0].producttotalprice = this.edit_form_inputs[3].value;
        data[0].productdate = this.edit_form_inputs[4].value;
        this.SetData(currentData); 
        //=========== Add Data To Local Storage After Edit ==============> 
        //====== Draw Ui After Edit ======>
        this.DrawUi();
        location.reload();
        //====== Hide Form ======>
        e.preventDefault();
        e.target.parentNode.classList.remove('active_form');
        //====== Hide Form ======>
        })
        //========== Clac At Edit Form ================>
        this.Input();
        //========== Clac At Edit Form ================>
    }
}
const dataediter = new DataEditer();
//============ DataEditer ===============>

//============ Seach ===============>
class Search extends DataEditer{
    search:HTMLInputElement;
    constructor(){
        super();
        this.search = document.querySelector('.search')!;
    }
    Searcher(){
        this.search.addEventListener('input',(e:any) => {
            const ele_data = document.querySelectorAll('#name') as NodeListOf<HTMLElement>;
            let ele_filter:HTMLElement[];

            Array.from(this.tbody.children).forEach(ele => {
                ele.classList.add('hide')
            })
            
            if(e.target.value.length == 0){
                Array.from(this.tbody.children).forEach(ele => {
                    ele.classList.remove('hide')
                })
            }else if(e.target.value.length > 0){
                ele_filter = Array.from(ele_data).filter(ele => ele.innerText == e.target.value);
                ele_filter.forEach(ele => {
                    const ele_show = ele.parentNode as HTMLElement;
                    ele_show.classList.remove('hide');
                })
            }
        })
    }
}
const search = new Search();
//============ Seach ===============>

//============= Rest Methods And Class Methods =============>
window.addEventListener('load',() => {
    dataster.DrawUi();
    dataediter.Deleter(document.querySelectorAll('.controlls .delete'));
    dataediter.Filter_Data(document.querySelectorAll('.controlls .edit'));
    search.Searcher();
})